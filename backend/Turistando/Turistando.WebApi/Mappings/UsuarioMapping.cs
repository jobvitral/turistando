using Microsoft.EntityFrameworkCore;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Mappings
{
    public class UsuarioMapping
    {
        public static void Map(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(entity =>
            {
                //key
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                //properties
                entity.Property(e => e.Nome).HasMaxLength(250).IsRequired();
                entity.Property(e => e.Avatar).HasMaxLength(250).IsRequired();
                entity.Property(e => e.DataNascimento).IsRequired();
                entity.Property(e => e.Sexo).HasMaxLength(2).IsRequired();
                entity.Property(e => e.Cidade).HasMaxLength(250);
                entity.Property(e => e.Estado).HasMaxLength(50);
                entity.Property(e => e.Telefone).HasMaxLength(50).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(250).IsRequired();
                entity.Property(e => e.Senha).HasMaxLength(250).IsRequired();
                entity.Property(e => e.GuiaCarro).HasMaxLength(250);
                entity.Property(e => e.GuiaPlaca).HasMaxLength(250);
                entity.Property(e => e.GuiaHorario).HasColumnType("text");
                entity.Property(e => e.GuiaDetalhe).HasColumnType("text");
                entity.Property(e => e.GuiaAvaliacao).HasColumnType("double(15,2)");
            });
        }
    }
}