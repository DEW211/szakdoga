using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ordering.DAL;
using Ordering.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ordering.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderingController : ControllerBase
    {
        private readonly IOrderingRepository repository;
        private readonly IPublishEndpoint publishEndpoint;

        public OrderingController(IOrderingRepository repository, IPublishEndpoint publishEndpoint)
        {
            this.repository = repository;
            this.publishEndpoint = publishEndpoint;
        }

        [HttpPost]
        public ActionResult PostOrder(Order order)
        {
            var email = Request.Headers["email"].ToString();
            if (String.IsNullOrEmpty(email))
            {
                //return BadRequest();
            }


            bool success = repository.PlaceOrder(order, email);
            if (success)
                return Ok();
            return BadRequest();
        }

        [HttpGet]
        public async Task<ActionResult> Publish()
        {
            await publishEndpoint.Publish(new Events.ProductOutOfStockEvent
            {
                Id = 3
            });

            return Ok();
        }
    }
}
