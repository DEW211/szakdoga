using Identity.DAL.EfDbContext;
using Identity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Identity.DAL
{
    public class IdentityRepository : IIdentityRepository
    {

        private readonly IdentityDbContext db;
        public IdentityRepository(IdentityDbContext db)
        {
            this.db = db;
        }

        public IReadOnlyCollection<User> List()
        {
            var list = db.Users.Select(user => ToModel(user)).ToList();
            return list;
        }

        private static Models.User ToModel(DbUser user)
        {
            return new Models.User { Email = user.Email, PasswordHash = user.PasswordHash };
        }

        public bool Register(string email, string password)
        {
            var user = db.Users.FirstOrDefault(e => e.Email == email);
            if (user != null)
            {
                return false;
            }

            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            DbUser newUser = new DbUser
            {
                Email = email,
                PasswordHash = hash
            };
            db.Users.Add(newUser);
            db.SaveChanges();
            return true;
        }

        public bool CheckPassword(string email, string password)
        {
            var user = db.Users.FirstOrDefault(u => u.Email == email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return false;
            }
            return true;
        }

        public bool UserExists(string email)
        {
            var user = db.Users.FirstOrDefault(u => u.Email == email);

            return user != null;
        }

        

    }
}
