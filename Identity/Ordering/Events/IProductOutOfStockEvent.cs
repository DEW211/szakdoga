using System;
using System.Collections.Generic;
using System.Text;

namespace Ordering.Events
{
    interface IProductOutOfStockEvent
    {
        public int Id { get; }
    }
}
