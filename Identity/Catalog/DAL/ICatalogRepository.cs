using Catalog.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.DAL
{
    public interface ICatalogRepository
    {
        IReadOnlyCollection<Product> List(int pageNumber);

        public int GetProductCount();

        int Insert(Product product);

        Product FindByName(string name);

        Product FindById(int id);
        DetailedProduct FindDetailedProductById(string id);
        bool RemoveProductFromAvailable(int id);
    }
}
