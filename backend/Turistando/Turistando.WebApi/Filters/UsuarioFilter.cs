using Turistando.WebApi.Helpers;

namespace Turistando.WebApi.Filters
{
    public class UsuarioFilter
    {
        public int[] Ids { get; set; }
        public EnumTipoUsuario? Tipo { get; set; }
        public string Nome { get; set; }
        public string Sexo { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string Carro { get; set; }
        public string Placa { get; set; }
        public double? AvaliacaoMinimo { get; set; }
        public double? AvaliacaoMaximo { get; set; }
    }
}