using System;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Turistando.WebApi.Mappings;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Contexts
{
    public class TuristandoContext : DbContext
    {
        public TuristandoContext() : base()
        {
            
        }

        public DbSet<Categoria> Categoria { get; set; }
        public DbSet<Reserva> Reserva { get; set; }
        public DbSet<ReservaRoteiro> ReservaRoteiro { get; set; }
        public DbSet<Roteiro> Roteiro { get; set; }
        public DbSet<RoteiroCategoria> RoteiroCategoria { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("Server=ecolinx.com.br;Port=3306;Database=turistando_dev;User=ecolinx;Password=C@dmin2014;", options =>
            {
                options.ServerVersion(new Version(5, 7, 27), ServerType.MySql);
            });
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            CategoriaMapping.Map(modelBuilder);
            ReservaMapping.Map(modelBuilder);
            ReservaRoteiroMapping.Map(modelBuilder);
            RoteiroCategoriaMapping.Map(modelBuilder);
            RoteiroMapping.Map(modelBuilder);
            UsuarioMapping.Map(modelBuilder);
        }
    }
}