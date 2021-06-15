using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basket.Model
{
    public class Basket
    {
        public int Id { get; set; }
        public ICollection<Product> Cart { get; set; }
    }
}
