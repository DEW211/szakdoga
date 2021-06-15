using Ordering.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ordering.DAL
{
    public interface IOrderingRepository
    {
        bool PlaceOrder(Order order, string email);
    }
}
