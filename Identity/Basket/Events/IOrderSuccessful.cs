using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basket.Events
{
    public interface IOrderSuccessful
    {
        public int Id { get; }
    }
}
