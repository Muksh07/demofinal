using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace todoappbackend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? userName { get; set; }
        public string? password { get; set; }

        // public ICollection<TodoTask> Tasks { get; set; }
    }
}