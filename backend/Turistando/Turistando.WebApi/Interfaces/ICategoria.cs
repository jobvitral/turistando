using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Turistando.WebApi.Filters;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Interfaces
{
    public interface ICategoria : IDisposable
    {
        Task<Categoria> Busca(int id);
        Task<ICollection<Categoria>> Busca(CategoriaFilter filtro);
        IQueryable<Categoria> Filter(IQueryable<Categoria> query, CategoriaFilter filter);
        ValidationModel Valida(Categoria item);
        Task<Categoria> Insere(Categoria item);
        Task<Categoria> Atualiza(Categoria item);
        Task<Categoria> Deleta(int id);
    }
}