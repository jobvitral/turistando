namespace Turistando.WebApi.Filters
{
    public class RoteiroFilter
    {
        public int[] Ids { get; set; }
        public int[] Guias { get; set; }
        public int[] Categorias { get; set; }
        public string[] Cidades { get; set; }
        public string[] Estados { get; set; }
        public double? ValorMinimo { get; set; }
        public double? ValorMaximo { get; set; }
        
    }
}