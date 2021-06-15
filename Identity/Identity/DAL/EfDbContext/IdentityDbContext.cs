using Microsoft.EntityFrameworkCore;



namespace Identity.DAL.EfDbContext
{
    public class IdentityDbContext : DbContext
    {
        public DbSet<DbUser> Users { get; set; }

        public IdentityDbContext(DbContextOptions<IdentityDbContext> options): base(options)
        {

        }
    }
}
