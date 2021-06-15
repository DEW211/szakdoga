using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ordering.DAL.EfDbContext
{
    public class OrderingDbContext : DbContext
    {
        public DbSet<DbOrder> Orders { get; set; }
        public DbSet<DbStock> Stock { get; set; }

        public OrderingDbContext(DbContextOptions<OrderingDbContext> options) : base(options)
        {

        }
    }
}
