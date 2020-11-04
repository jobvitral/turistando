using System.Collections.Generic;

namespace Turistando.WebApi.Models
{
    public class Categoria
    {
        public Categoria()
        {
            this.RoteiroCategorias = new List<RoteiroCategoria>();
        }

        public int Id { get; set; }
        public string Nome { get; set; }

        public virtual ICollection<RoteiroCategoria> RoteiroCategorias { get; set; }
    }
}