using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace Basket.DAL.EfDbContext
{
    public class DbProduct
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public int Amount { get; set; }

        public int DbBasketId { get; set; }
        public DbBasket Basket { get; set; }
    }
}
