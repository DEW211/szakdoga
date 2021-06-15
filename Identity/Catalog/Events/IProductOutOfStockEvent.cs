using System;
using System.Collections.Generic;
using System.Text;

namespace Ordering.Events
{
    public interface IProductOutOfStockEvent
    {
        public int Id { get; }
    }
}
