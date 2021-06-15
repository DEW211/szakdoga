using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ordering.DAL.EfDbContext
{
    public class DbOrder
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Holder { get; set; }
        [Required]
        public ICollection<DbProduct> Basket { get; set; }

        public int BasketId { get; set; }

        public int Price { get; set; }
    }
}

