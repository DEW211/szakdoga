using Ordering.DAL.EfDbContext;
using Ordering.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using MassTransit;
using System.Threading.Tasks;


namespace Ordering.DAL
{
    public class OrderingRepository : IOrderingRepository
    {
        private readonly OrderingDbContext db;
        private readonly IPublishEndpoint publishEndpoint;


        public OrderingRepository(OrderingDbContext context, IPublishEndpoint publishEndpoint)
        {
            db = context;
            this.publishEndpoint = publishEndpoint;
        }

        public bool PlaceOrder(Order order, string email)
        {
            var dbOrder = db.Orders.FirstOrDefault(o => o.Holder == email && o.BasketId == order.BasketId);
            if(dbOrder != null)
            {
                return false;
            }


            var products = order.Products.Select(p => new DbProduct
            {
                ProductId = p.Id,
                Amount = p.Amount,

            }).ToList();

            var toInsert = new DbOrder
            {
                Basket = products,
                BasketId = order.BasketId,
                Price = order.Price,
                Holder = email
            };

            var productIds = order.Products.Select(p => p.Id).ToList();
            var productsOnStock = db.Stock.Where(p => productIds.Contains(p.Id)).ToList();

            productsOnStock.ForEach(p => 
            {
                p.Stock -= products.Single(k => k.ProductId == p.Id).Amount;
                if(p.Stock <= 0)
                {
                    publishEndpoint.Publish(new Events.ProductOutOfStockEvent
                    {
                        Id = p.Id
                    });
                }
            });
            //if < 0 alert msg q


            try
            {
                db.Orders.Add(toInsert);
                db.SaveChanges();
                publishEndpoint.Publish(new Basket.Events.OrderSuccessful
                {
                    Id = toInsert.BasketId
                });
                return true;
            }
            catch (Exception e)
            {

                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
                return false;
            }
        }
    }
}
