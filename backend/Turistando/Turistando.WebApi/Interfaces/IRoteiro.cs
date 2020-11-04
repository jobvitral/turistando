using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Turistando.WebApi.Filters;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Interfaces
{
    public interface IRoteiro : IDisposable
    {
        Task<Roteiro> Busca(int id);
        Task<ICollection<Roteiro>> Busca(RoteiroFilter filtro);
        IQueryable<Roteiro> Filter(IQueryable<Roteiro> query, RoteiroFilter filter);
        ValidationModel Valida(Roteiro item);
        Task<Roteiro> Insere(Roteiro item);
        Task<Roteiro> Atualiza(Roteiro item);
        Task<Roteiro> Deleta(int id);
    }
}