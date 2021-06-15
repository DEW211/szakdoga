using Identity.DAL;
using Identity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private readonly IIdentityRepository repository;
        private readonly IConfiguration _config;
        public IdentityController(IIdentityRepository repository, IConfiguration config)
        {
            this.repository = repository;
            _config = config;
        }


        [Route("TestRun")]
        [HttpGet]
        public ActionResult TestRun()
        {
            return Ok("Success");
        }

        [Route("list")]
        [HttpGet]
        public ActionResult<IReadOnlyCollection<User>> List()
        {
            var list = repository.List();
            return Ok(list);
        }

        [Route("register")]
        [HttpPost]
        public ActionResult Register([FromBody] UserUn user)
        {
            bool res = repository.Register(user.Email, user.Password);
            if (res)
            {
                return Ok(res);
            }
            else
            {
                return BadRequest("Account already exists");
            }
        }

        [Route("login")]
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<LoginResponse> Login([FromBody] UserUn user)
        {
            //1. Check if user exists
            bool exists = repository.UserExists(user.Email);
            if (!exists)
            {
                return Unauthorized(new LoginResponse
                {
                    Success = false,
                    ErrorMsg = "Invalid email address"
                });
            }
            //2. password is matching
            bool isPasswMatch = repository.CheckPassword(user.Email, user.Password);
            if (!isPasswMatch)
            {
                return Unauthorized(new LoginResponse
                {
                    Success = false,
                    ErrorMsg = "Invalid password"
                });
            }
            //issue token
            var token = GenerateJSONWebToken(user.Email);
            return Ok(new LoginResponse
            {
                Success = true,
                Token = token
            });


            //return Ok(repository.CheckPassword(user.Email, user.Password));
        }

        [Route("secured")]
        [Authorize]
        [HttpGet]
        public ActionResult Secured()
        {
            var claims = HttpContext.User.Claims;
            var email = claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress");
            Response.Headers.Add("Email", email.Value);
            return Ok(email.Value);
        }

        private string GenerateJSONWebToken(string email)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
