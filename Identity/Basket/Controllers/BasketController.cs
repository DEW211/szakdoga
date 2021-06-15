using Basket.DAL;
using Basket.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository repository;

        public BasketController(IBasketRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public ActionResult<Model.Basket> GetBasket()
        {
            var email = Request.Headers["email"];
            if(StringValues.IsNullOrEmpty(email))
            {
                return NotFound();
            }
            var basket = repository.GetBasket(email);
            return basket;
        }

        [HttpPost]
        public ActionResult<Model.Basket> PostBasket(Model.Basket basket)
        {
            var email = Request.Headers["email"].ToString();
            if (String.IsNullOrEmpty(email))
            {
                return BadRequest();
            }

            var created = repository.CreateBasket(basket, email);
            return created;
        }

        [HttpPatch]
        public ActionResult<Model.Basket> UpdateBasket(Model.Composite product)
        {
            var email = Request.Headers["email"].ToString();
            if (String.IsNullOrEmpty(email))
            {
                return BadRequest();
            }
            var updated = repository.UpdateBasket(product.Product, product.Id);
           if(updated == null)
            {
                return NotFound();
            }
            else
            {
                return updated;
            }
        }
    }
}
