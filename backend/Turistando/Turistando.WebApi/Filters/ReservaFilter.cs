using System;

namespace Turistando.WebApi.Filters
{
    public class ReservaFilter
    {
        public int[] Ids { get; set; }
        public int? Turista { get; set; }
        public int? Guia { get; set; }
        public int[] Roteiros { get; set; }
        public DateTime? DataCriacaoInicio { get; set; }
        public DateTime? DataCriacaoFim { get; set; }
        public DateTime? DataReservaInicio { get; set; }
        public DateTime? DataReservaFim { get; set; }
    }
}