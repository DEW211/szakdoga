using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ordering.Events
{
    public class ProductOutOfStockEvent : IProductOutOfStockEvent
    {
        public int Id { get; set; }
    }
}
