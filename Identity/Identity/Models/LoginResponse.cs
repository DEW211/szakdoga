using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Identity.Models
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public bool Success { get; set; }
        public string ErrorMsg { get; set; }
    }
}
