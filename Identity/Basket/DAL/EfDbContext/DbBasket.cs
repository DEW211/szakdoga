using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Basket.DAL.EfDbContext
{
    public class DbBasket
    {
        [Key]
        public int Id { get; set; } 
        public string Holder { get; set; }
        public bool Active { get; set; }
        public ICollection<DbProduct> Cart { get; set; }
    }
}
