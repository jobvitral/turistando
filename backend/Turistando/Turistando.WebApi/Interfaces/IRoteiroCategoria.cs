using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Turistando.WebApi.Filters;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Interfaces
{
    public interface IRoteiroCategoria : IDisposable
    {
        Task<RoteiroCategoria> Busca(int idRoteiro, int idCategoria);
        Task<ICollection<RoteiroCategoria>> Busca(RoteiroCategoriaFilter filtro);
        IQueryable<RoteiroCategoria> Filter(IQueryable<RoteiroCategoria> query, RoteiroCategoriaFilter filter);
        ValidationModel Valida(RoteiroCategoria item);
        Task<RoteiroCategoria> Insere(RoteiroCategoria item);
        Task<RoteiroCategoria> Atualiza(RoteiroCategoria item);
        Task<RoteiroCategoria> Deleta(int idRoteiro, int idCategoria);
    }
}