using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Model
{
    public class DetailedProduct : Product
    {
        public ICollection<ImageLinks> Images { get; set; }
    }
}
