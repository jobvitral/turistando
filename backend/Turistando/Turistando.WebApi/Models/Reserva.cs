using System;
using System.Collections.Generic;

namespace Turistando.WebApi.Models
{
    public class Reserva
    {
        public Reserva()
        {
            this.ReservaRoteiros = new List<ReservaRoteiro>();
        }

        public int Id { get; set; }
        public int IdTurista { get; set; }
        public int IdGuia { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataReserva { get; set; }
        public string Horario { get; set; }
        public string Local { get; set; }
        public double ValorTotal { get; set; }
        public double Avaliacao { get; set; }

        public virtual Usuario Turista { get; set; }
        public virtual Usuario Guia { get; set; }
        public virtual ICollection<ReservaRoteiro> ReservaRoteiros { get; set; }
    }
}