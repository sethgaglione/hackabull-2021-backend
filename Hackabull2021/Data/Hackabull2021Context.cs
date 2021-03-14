using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Hackabull2021.Models;

namespace Hackabull2021.Data
{
    public class Hackabull2021Context : DbContext
    {
        public Hackabull2021Context (DbContextOptions<Hackabull2021Context> options)
            : base(options)
        {
        }

        public DbSet<Test> Test { get; set; }
    }
}
