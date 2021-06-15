using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.DAL.EfDbContext
{
    [Table("Products")]
    public class DbProduct
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        public bool Available { get; set; }
        [Required]
        public float Price { get; set; }

        public ICollection<DbImageLinks> Images { get; set; }
    }
}
