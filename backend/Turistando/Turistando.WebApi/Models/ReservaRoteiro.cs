namespace Turistando.WebApi.Models
{
    public class ReservaRoteiro
    {
        public ReservaRoteiro()
        {
            
        }

        public int IdReserva { get; set; }
        public int IdRoteiro { get; set; }
        public string Informacoes { get; set; }
        public double Valor { get; set; }
        public double Avaliacao { get; set; }

        public virtual Reserva Reserva { get; set; }
        public virtual Roteiro Roteiro { get; set; }
    }
}