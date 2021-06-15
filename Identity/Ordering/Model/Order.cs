using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ordering.Model
{
    public class Order
    {
        public int BasketId { get; set; }
        public ICollection<Product> Products { get; set; }
        public int Price { get; set; }
    }
}
