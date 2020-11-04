using System.Collections.Generic;
using System.Runtime;

namespace Turistando.WebApi.Models
{
    public class Roteiro
    {
        public Roteiro()
        {
            this.ReservaRoteiros = new List<ReservaRoteiro>();
            this.RoteiroCategorias = new List<RoteiroCategoria>();
        }

        public int Id { get; set; }
        public int IdGuia { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Descricao { get; set; }
        public double Valor { get; set; }
        public double Tempo { get; set; }

        public virtual Usuario Guia { get; set; }
        public virtual ICollection<ReservaRoteiro> ReservaRoteiros { get; set; }
        public virtual ICollection<RoteiroCategoria> RoteiroCategorias { get; set; }
    }
}