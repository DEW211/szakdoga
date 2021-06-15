using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basket.DAL.EfDbContext
{
    public class BasketDbContext : DbContext
    {
        public DbSet<DbBasket> Baskets { get; set; }

        public BasketDbContext(DbContextOptions<BasketDbContext> options) : base(options)
        {

        }
    }
}
