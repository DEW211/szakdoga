using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Ordering.DAL.EfDbContext
{
    [Table("Stock")]
    public class DbStock
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Stock { get; set; }
    }
}
