using Catalog.DAL.EfDbContext;
using Catalog.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.DAL
{
    public class CatalogRepository : ICatalogRepository
    {

        private readonly CatalogDbContext db;

        public CatalogRepository(CatalogDbContext context)
        {
            db = context;
        }

        public int GetProductCount()
        {
            return db.Products.Count();
        }

        public IReadOnlyCollection<Product> List(int pageNumber = 1)
        {
            var list = db.Products.Where(p => p.Available).OrderBy(p => p.Id).Select(p => ToModel(p)).Skip((pageNumber - 1)*8).Take(8).ToList();
            return list;
        }

        private static Product ToModel(DbProduct p)
        {
            if (p == null)
                return null;
            return new Product
            {
                Id = p.Id,
                ImageUrl = p.ImageUrl,
                Name = p.Name,
                Price = p.Price
            };
        }

        public int Insert(Product product)
        {
            DbProduct productToAdd = new DbProduct
            {
                Available = true,
                ImageUrl = product.ImageUrl,
                Name = product.Name,
                Price = product.Price
            };

            db.Products.Add(productToAdd);
            return db.SaveChanges();
        }

        public Product FindByName(string name)
        {
            var product = db.Products.FirstOrDefault(p => p.Name == name);
            
            return ToModel(product);
        }

        public Product FindById(int id)
        {
            var product = ToModel(db.Products.FirstOrDefault(p => p.Id == id));
            return product;
        }

        public DetailedProduct FindDetailedProductById(string id)
        {
            if(!int.TryParse(id, out int dbId)){
                return null;
            }
            var product = db.Products.Include(p => p.Images).FirstOrDefault(p => p.Id == dbId);

            return ToDetailedModel(product);
        }

        public bool RemoveProductFromAvailable(int id)
        {
            var product = db.Products.FirstOrDefault(p => p.Id == id);
            if(product == null)
            {
                return false;
            }
            product.Available = false;
            db.SaveChanges();
            return true;

        }

        private static DetailedProduct ToDetailedModel(DbProduct p)
        {
            if (p == null)
                return null;

            var images = p.Images.Select(i => new ImageLinks { ImgLarge = i.ImgLarge, ImgSmall = i.ImgSmall }).ToList();
            return new DetailedProduct
            {
                Id = p.Id,
                ImageUrl = p.ImageUrl,
                Name = p.Name,
                Price = p.Price,
                Images = images
            };
        }
    }
}
