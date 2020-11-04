using Microsoft.EntityFrameworkCore;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Mappings
{
    public class ReservaMapping
    {
        public static void Map(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reserva>(entity =>
            {
                //key
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                //properties
                entity.Property(e => e.IdTurista).IsRequired();
                entity.Property(e => e.IdGuia).IsRequired();
                entity.Property(e => e.DataCriacao).IsRequired();
                entity.Property(e => e.DataReserva).IsRequired();
                entity.Property(e => e.Horario).HasMaxLength(250);
                entity.Property(e => e.Local).HasMaxLength(250);
                entity.Property(e => e.ValorTotal).HasColumnType("double(15,2)");
                entity.Property(e => e.Avaliacao).HasColumnType("double(15,2)");

                //relationships
                entity.HasOne(a => a.Turista)
                    .WithMany(a => a.ReservasTurista)
                    .HasForeignKey(a => a.IdTurista)
                    .OnDelete(DeleteBehavior.Cascade);
                
                entity.HasOne(a => a.Guia)
                    .WithMany(a => a.ReservasGuia)
                    .HasForeignKey(a => a.IdGuia)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}