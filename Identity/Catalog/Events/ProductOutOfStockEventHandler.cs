using Catalog.DAL;
using MassTransit;
using Ordering.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Events
{
    public class ProductOutOfStockEventHandler : IConsumer<IProductOutOfStockEvent>
    {
        private readonly ICatalogRepository repository;

        public ProductOutOfStockEventHandler(ICatalogRepository repo)
        {
            repository = repo;
        }
        public Task Consume(ConsumeContext<IProductOutOfStockEvent> context)
        {
            Console.WriteLine(context.Message.Id);

            repository.RemoveProductFromAvailable(context.Message.Id);

            return Task.CompletedTask;
        }
    }
}
