using System;
using System.Collections.Generic;
using Turistando.WebApi.Helpers;

namespace Turistando.WebApi.Models
{
    public class Usuario
    {
        public Usuario()
        {
            this.Roteiros = new List<Roteiro>();
            this.ReservasTurista = new List<Reserva>();
            this.ReservasGuia = new List<Reserva>();
        }

        public int Id { get; set; }
        public EnumTipoUsuario Tipo { get; set; }
        public string Nome { get; set; }
        public string Avatar { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Sexo { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string GuiaCarro { get; set; }
        public string GuiaPlaca { get; set; }
        public string GuiaHorario { get; set; }
        public string GuiaDetalhe { get; set; }
        public double GuiaAvaliacao { get; set; }

        public virtual ICollection<Roteiro> Roteiros { get; set; }
        public virtual ICollection<Reserva> ReservasTurista { get; set; }
        public virtual ICollection<Reserva> ReservasGuia { get; set; }
    }
}