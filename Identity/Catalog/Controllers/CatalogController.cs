using Catalog.DAL;
using Catalog.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : ControllerBase
    {

        private readonly ICatalogRepository repository;

        public CatalogController(ICatalogRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public ActionResult<object> List([FromQuery] int page)
        {
            var count = repository.GetProductCount();
            Response.Headers.Add("pageCount", count.ToString());
            IReadOnlyCollection<Product> products = repository.List(page);

            return Ok(new { products, count });
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult AddProduct(Product product)
        {
            var result = repository.Insert(product);

            if(result == 0)
            {
                return BadRequest();
            }
            else
            {
                return Created("uri", product);
            }
        }

        [HttpGet("{name}")]
        public ActionResult<DetailedProduct> GetProduct(string name)
        {
            var product = repository.FindDetailedProductById(name);
            if(product == null)
            {
                return NotFound();
            }
            return product;
        }
    }
}
