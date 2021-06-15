using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basket.Events
{
    public class OrderSuccessful : IOrderSuccessful
    {
        public int Id { get; set; }
    }
}
