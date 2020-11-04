using Microsoft.EntityFrameworkCore;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Mappings
{
    public class RoteiroMapping
    {
        public static void Map(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Roteiro>(entity =>
            {
                //key
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                //properties
                entity.Property(e => e.IdGuia).IsRequired();
                entity.Property(e => e.Nome).HasMaxLength(250).IsRequired();
                entity.Property(e => e.Imagem).HasMaxLength(250);
                entity.Property(e => e.Cidade).HasMaxLength(250);
                entity.Property(e => e.Estado).HasMaxLength(50);
                entity.Property(e => e.Descricao).HasColumnType("text");
                entity.Property(e => e.Valor).HasColumnType("double(15,2)");
                entity.Property(e => e.Tempo).HasMaxLength(250);
                
                //relationships
                entity.HasOne(a => a.Guia)
                    .WithMany(a => a.Roteiros)
                    .HasForeignKey(a => a.IdGuia)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}