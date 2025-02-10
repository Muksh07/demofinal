using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using todoappbackend.Models;


namespace todoappbackend.Database
{
    public class DatabaseContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=NL10-DP2110;Initial Catalog=todopersonal;Integrated Security=True;Encrypt=False;");
        }
        public DbSet<User> Users { get; set; }
        public DbSet<TodoTask> Tasks { get; set; }
        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);
        //     modelBuilder.Entity<TodoTask>()
        //         .WithMany(u => u.Tasks)
        //         .HasForeignKey(t => t.UserId);
        // }
    }
}