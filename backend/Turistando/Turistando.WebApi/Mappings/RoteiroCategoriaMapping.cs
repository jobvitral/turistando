using Microsoft.EntityFrameworkCore;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Mappings
{
    public class RoteiroCategoriaMapping
    {
        public static void Map(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoteiroCategoria>(entity =>
            {
                //key
                entity.HasKey(e => new { e.IdRoteiro, e.IdCategoria });
                
                //properties
                entity.Property(e => e.IdRoteiro).IsRequired();
                entity.Property(e => e.IdCategoria).IsRequired();

                //relationships
                entity.HasOne(a => a.Roteiro)
                    .WithMany(a => a.RoteiroCategorias)
                    .HasForeignKey(a => a.IdRoteiro)
                    .OnDelete(DeleteBehavior.Cascade);
                
                entity.HasOne(a => a.Categoria)
                    .WithMany(a => a.RoteiroCategorias)
                    .HasForeignKey(a => a.IdCategoria)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}