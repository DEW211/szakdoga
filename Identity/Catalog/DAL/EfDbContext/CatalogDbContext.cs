using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.DAL.EfDbContext
{
    public class CatalogDbContext : DbContext
    {
        public DbSet<DbProduct> Products { get; set; }

        public CatalogDbContext(DbContextOptions<CatalogDbContext> options) : base(options)
        {

        }
    }
}
