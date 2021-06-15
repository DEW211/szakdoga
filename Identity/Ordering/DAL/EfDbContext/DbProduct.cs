using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ordering.DAL.EfDbContext
{
    public class DbProduct
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Amount { get; set; }

        [Required]
        public int ProductId { get; set; }

        public int OrderId { get; set; }
        public DbOrder Order { get; set; }
    }
}
