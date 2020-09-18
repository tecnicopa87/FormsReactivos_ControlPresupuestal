using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactiveForm.web.Models
{
    public class ApplicationDBContext:DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
            :base(options)
        {

        }
        public DbSet<Persona> Personas { get; set; }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Producto> productos { get; set; }
    }
}
