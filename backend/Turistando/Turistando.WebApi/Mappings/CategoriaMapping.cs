using Microsoft.EntityFrameworkCore;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Mappings
{
    public class CategoriaMapping
    {
        public static void Map(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categoria>(entity =>
            {
                //key
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                //properties
                entity.Property(e => e.Nome).HasMaxLength(250).IsRequired();
            });
        }
    }
}