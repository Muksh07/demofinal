using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todoappbackend.Database;
using todoappbackend.Functionality;
using todoappbackend.Models;

namespace todoappbackend.Service
{
    public class UserOperations: IUserfunctionality
    {
        DatabaseContext db;
        public UserOperations(DatabaseContext _db)
        {
            db = _db;
        }


        int IUserfunctionality.accountCreate(User user)
        {
            db.Users.Add(user);
            return db.SaveChanges();
        }

        int IUserfunctionality.LoginAccount(User user)
        {
            // FirstOrDefault(u => u.UserName == username)
            var res = db.Users.Where(t => t.userName == user.userName).First();
            if (user != null && res.password == user.password)
            {
                return res.Id;
            }
            return 0;
        }
    }
}