using Basket.DAL;
using MassTransit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basket.Events
{
    public class OrderSuccessfulEventHandler : IConsumer<IOrderSuccessful>
    {
        private readonly IBasketRepository repository;
        public OrderSuccessfulEventHandler(IBasketRepository repo)
        {
            repository = repo;
        }
        public Task Consume(ConsumeContext<IOrderSuccessful> context)
        {
            Console.WriteLine(context.Message.Id);

            //availabla false a kosáron
            repository.RemoveBasketFromActive(context.Message.Id);
            

            return Task.CompletedTask;
        }
    }
}
