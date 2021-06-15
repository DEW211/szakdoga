using Identity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Identity.DAL
{
    public interface IIdentityRepository
    {
        IReadOnlyCollection<User> List();
        bool Register(string email, string password);
        bool CheckPassword(string email, string password);

        bool UserExists(string email);
    }


}
