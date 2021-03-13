using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Hackabull2021Backend.Models;

namespace Hackabull2021Backend.Data
{
    public class Hackabull2021BackendContext : DbContext
    {
        public Hackabull2021BackendContext (DbContextOptions<Hackabull2021BackendContext> options)
            : base(options)
        {
        }

        public DbSet<Hackabull2021Backend.Models.Test> Test { get; set; }
    }
}
