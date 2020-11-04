using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Turistando.WebApi.Filters;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Interfaces
{
    public interface IUsuario : IDisposable
    {
        Task<Usuario> Busca(int id);
        Task<ICollection<Usuario>> Busca(UsuarioFilter filtro);
        IQueryable<Usuario> Filter(IQueryable<Usuario> query, UsuarioFilter filter);
        ValidationModel Valida(Usuario item);
        Task<Usuario> Insere(Usuario item);
        Task<Usuario> Atualiza(Usuario item);
        Task<Usuario> Deleta(int id);
    }
}