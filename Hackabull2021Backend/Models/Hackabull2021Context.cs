using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Hackabull2021Backend.Models
{
    public class Hackabull2021Context : DbContext
    {
        public Hackabull2021Context(DbContextOptions<Hackabull2021Context> options)
            : base(options)
        {
        }

        public DbSet<Test> Tests { get; set; }
    }
}
