using Basket.DAL.EfDbContext;
using Basket.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace Basket.DAL
{
    public class BasketRepository : IBasketRepository
    {

        private readonly BasketDbContext db;

        public BasketRepository(BasketDbContext context)
        {
            db = context;
        }
        public Model.Basket GetBasket(StringValues email)
        {
            var basket = db.Baskets.Include(basket => basket.Cart).FirstOrDefault(b => b.Active == true && b.Holder == email.ToString());

            if(basket != null)
            {
                return ToModel(basket);
            }

            DbBasket newBasket = new DbBasket
            {
                Holder = email,
                Active = true,
            };
            db.Baskets.Add(newBasket);
            db.SaveChanges();
            return ToModel(newBasket);
        }

        private static Model.Basket ToModel(DbBasket basket)
        {
            ICollection<Model.Product> products = new Collection<Model.Product>();
            if(basket.Cart != null)
                products = basket.Cart.Select(i => new Model.Product { Amount = i.Amount, Id = i.Id, Image = i.Image, Name = i.Name, Price = i.Price }).ToList();
            return new Model.Basket
            {
                Id = basket.Id,
                Cart = products
            };
        }

        public Model.Basket CreateBasket(Model.Basket basket, string email)
        {
            var dbBasket = db.Baskets.FirstOrDefault(b => b.Active == true && b.Holder == email);
            if(dbBasket != null)
            {
                dbBasket.Active = false;
                db.SaveChanges();
            }


            var dbProducts = basket.Cart.Select(i => new DbProduct { Amount = i.Amount, Image = i.Image, Name = i.Name, Price = i.Price, ProductId = i.Id }).ToList();
            DbBasket newBasket = new DbBasket
            {
                Holder = email,
                Active = true,
                Cart = dbProducts
            };
            db.Baskets.Add(newBasket);
            db.SaveChanges();
            return ToModel(newBasket);
        }

        public Model.Basket UpdateBasket(Product product, int id)
        {
            var basket = db.Baskets.Include(b=>b.Cart).FirstOrDefault(b => b.Id == id && b.Active == true);
            if(basket == null)
            {
                return null;
            }
            var dbProduct = basket.Cart.FirstOrDefault(p => p.ProductId == product.Id);
            if(dbProduct == null)
            {
                basket.Cart.Add(new DbProduct {Price=product.Price, Basket = basket, DbBasketId=basket.Id, Amount = product.Amount, Image = product.Image, Name = product.Name, ProductId = product.Id });

            }
            else
            {
                dbProduct.Amount = product.Amount;
            }
            db.SaveChanges();
            return ToModel(basket);
        }

        public bool RemoveBasketFromActive(int id)
        {
            var basket = db.Baskets.FirstOrDefault(b => b.Id == id);
            if(basket == null)
            {
                return false;
            }
            basket.Active = false;
            db.SaveChanges();
            return true;
        }
    }
}
