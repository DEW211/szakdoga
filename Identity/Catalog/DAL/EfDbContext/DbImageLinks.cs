using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.DAL.EfDbContext
{
    public class DbImageLinks
    {   
        [Key]
        public int Id { get; set; }
        public string ImgLarge { get; set; }
        public string ImgSmall { get; set; }

        public int DbProductId { get; set; }
        public DbProduct Product { get; set; }

    }
}
