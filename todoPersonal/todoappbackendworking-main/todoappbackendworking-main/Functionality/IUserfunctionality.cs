using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todoappbackend.Models;

namespace todoappbackend.Functionality
{
    public interface IUserfunctionality
    {
        int accountCreate(User user);
        int LoginAccount(User user);
    }
}