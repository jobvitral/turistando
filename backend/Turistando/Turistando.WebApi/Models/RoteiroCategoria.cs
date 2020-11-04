namespace Turistando.WebApi.Models
{
    public class RoteiroCategoria
    {
        public RoteiroCategoria()
        {
            
        }

        public int IdRoteiro { get; set; }
        public int IdCategoria { get; set; }

        public virtual Roteiro Roteiro { get; set; }
        public virtual Categoria Categoria { get; set; }
    }
}