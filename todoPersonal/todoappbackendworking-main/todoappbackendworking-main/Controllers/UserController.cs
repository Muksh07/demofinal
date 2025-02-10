using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using todoappbackend.Functionality;
using todoappbackend.Models;

namespace todoappbackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        IUserfunctionality iuserfunctionality;
        public UserController(IUserfunctionality _iuserfunctionality)
        {

            iuserfunctionality = _iuserfunctionality;
            
        }

        [HttpPost]
        [Route("CreateAccount")]
        public IActionResult AddUser(User u)
        {
           
            User usr = new User();
            usr.userName = u.userName;
            usr.password = u.password;
            return Ok(iuserfunctionality.accountCreate(usr));
        }

        [HttpPost("AccountLogin")]
        public IActionResult GetUser(User user)
        {
          return Ok(iuserfunctionality.LoginAccount(user));
        }
    }
}