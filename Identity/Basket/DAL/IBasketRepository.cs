using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basket.DAL
{
    public interface IBasketRepository
    {
        Model.Basket GetBasket(StringValues email);
        Model.Basket CreateBasket(Model.Basket basket, string email);
        Model.Basket UpdateBasket(Model.Product product, int id);

        bool RemoveBasketFromActive(int id);
    }
}
