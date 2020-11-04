using System;
using System.Threading.Tasks;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Interfaces
{
    public interface IAutenticacao : IDisposable
    {
        ValidationModel Valida(LoginModel item);
        Task<Usuario> Login(LoginModel item);
    }
}