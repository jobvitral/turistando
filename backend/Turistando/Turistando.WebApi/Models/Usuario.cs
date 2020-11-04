using System;
using Turistando.WebApi.Helpers;

namespace Turistando.WebApi.Models
{
    public class Usuario
    {
        public Usuario()
        {
            
        }

        public int IdUsuario { get; set; }
        public EnumTipoUsuario Tipo { get; set; }
        public string Nome { get; set; }
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
        public decimal GuiaAvaliacao { get; set; }
        public bool Ativo { get; set; }
    }
}