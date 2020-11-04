using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Turistando.WebApi.Filters;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Interfaces
{
    public interface IReserva : IDisposable
    {
        Task<Reserva> Busca(int id);
        Task<ICollection<Reserva>> Busca(ReservaFilter filtro);
        IQueryable<Reserva> Filter(IQueryable<Reserva> query, ReservaFilter filter);
        ValidationModel Valida(Reserva item);
        Task<Reserva> Insere(Reserva item);
        Task<Reserva> Atualiza(Reserva item);
        Task<Reserva> Deleta(int id);
    }
}