using Microsoft.EntityFrameworkCore;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Mappings
{
    public class ReservaRoteiroMapping
    {
        public static void Map(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ReservaRoteiro>(entity =>
            {
                //key
                entity.HasKey(e => new { e.IdReserva, e.IdRoteiro });
                
                //properties
                entity.Property(e => e.IdReserva).IsRequired();
                entity.Property(e => e.IdRoteiro).IsRequired();
                entity.Property(e => e.Informacoes).HasMaxLength(250);
                entity.Property(e => e.Valor).HasColumnType("double(15,2)");
                entity.Property(e => e.Avaliacao).HasColumnType("double(15,2)");

                //relationships
                entity.HasOne(a => a.Reserva)
                    .WithMany(a => a.ReservaRoteiros)
                    .HasForeignKey(a => a.IdReserva)
                    .OnDelete(DeleteBehavior.Cascade);
                
                entity.HasOne(a => a.Roteiro)
                    .WithMany(a => a.ReservaRoteiros)
                    .HasForeignKey(a => a.IdRoteiro)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}