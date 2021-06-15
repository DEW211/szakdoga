using System;
using System.Collections.Generic;
using System.Text;

namespace Szakdoga.Events
{
    interface IProductOutOfStockEvent
    {
        public int Id { get; }
    }
}
