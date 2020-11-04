using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Turistando.WebApi.Filters;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Interfaces
{
    public interface IReservaRoteiro : IDisposable
    {
        Task<ReservaRoteiro> Busca(int idReserva, int idRoteiro);
        Task<ICollection<ReservaRoteiro>> Busca(ReservaRoteiroFilter filtro);
        IQueryable<ReservaRoteiro> Filter(IQueryable<ReservaRoteiro> query, ReservaRoteiroFilter filter);
        ValidationModel Valida(ReservaRoteiro item);
        Task<ReservaRoteiro> Insere(ReservaRoteiro item);
        Task<ReservaRoteiro> Atualiza(ReservaRoteiro item);
        Task<ReservaRoteiro> Deleta(int idReserva, int idRoteiro);
    }
}