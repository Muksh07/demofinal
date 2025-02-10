using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace todoappbackend.Models
{
    public class TodoTask
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }  // Changed from Text to Title

        public bool Completed { get; set; }

        public DateTime? DueDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        public int UserId { get; set; }
    }
}