using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Turistando.WebApi.Contexts;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Interfaces;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Repositories
{
    public class AutenticacaoRepository : IAutenticacao
    {
        private readonly TuristandoContext _db;

        public AutenticacaoRepository()
        {
            _db = new TuristandoContext();
        }

        public ValidationModel Valida(LoginModel item)
        {
            //inicializa objeto
            var validation = new ValidationModel();

            //executa as validacoes
            if (string.IsNullOrEmpty(item.Email))
            {
                validation.Valido = false;
                validation.Erros.Add("Informe o email");
            }
            
            if (string.IsNullOrEmpty(item.Senha))
            {
                validation.Valido = false;
                validation.Erros.Add("Informe a senha");
            }
            
            // retorna o resultado
            return validation;
        }

        public async Task<Usuario> Login(LoginModel item)
        {
            // inicializa a consulta
            var query = await _db.Usuario
                .FirstOrDefaultAsync(a => a.Email == item.Email && a.Senha == item.Senha);

            //retorna o resultado
            return query;
        }
        
        public void Dispose()
        {
            _db.Dispose();
        }
    }
}