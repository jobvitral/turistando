using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Turistando.WebApi.Contexts;
using Turistando.WebApi.Filters;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Interfaces;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Repositories
{
    public class UsuarioRepository : IUsuario
    {
        private readonly TuristandoContext _db;

        public UsuarioRepository()
        {
            _db = new TuristandoContext();
        }
        
        public async Task<Usuario> Busca(int id)
        {
            // inicializa a consulta
            var query = await _db.Usuario
                .FirstOrDefaultAsync(a => a.Id == id);

            //retorna o resultado
            return query;
        }

        public async Task<ICollection<Usuario>> Busca(UsuarioFilter filtro)
        {
            //inicializa a consulta
            var query = _db.Usuario
                .AsQueryable();

            // faz o filtro
            query = Filter(query, filtro);

            //retorna o resultado
            return await query.ToListAsync();
        }

        public IQueryable<Usuario> Filter(IQueryable<Usuario> query, UsuarioFilter filter)
        {
            // executa os filtros
            if (filter.Ids != null)
            {
                query = query.Where(a => filter.Ids.Contains(a.Id));
            }
            
            if (filter.Tipo != null)
            {
                query = query.Where(a => a.Tipo == filter.Tipo);
            }
            
            if (!string.IsNullOrEmpty(filter.Nome))
            {
                query = query.Where(a => a.Nome.Contains(filter.Nome));
            }
            
            if (!string.IsNullOrEmpty(filter.Sexo))
            {
                query = query.Where(a => a.Sexo.Contains(filter.Sexo));
            }
            
            if (!string.IsNullOrEmpty(filter.Cidade))
            {
                query = query.Where(a => a.Cidade.Contains(filter.Cidade));
            }
            
            if (!string.IsNullOrEmpty(filter.Estado))
            {
                query = query.Where(a => a.Estado.Contains(filter.Estado));
            }
            
            if (!string.IsNullOrEmpty(filter.Telefone))
            {
                query = query.Where(a => a.Telefone.Contains(filter.Telefone));
            }
            
            if (!string.IsNullOrEmpty(filter.Email))
            {
                query = query.Where(a => a.Email.Contains(filter.Email));
            }
            
            if (!string.IsNullOrEmpty(filter.Carro))
            {
                query = query.Where(a => a.GuiaCarro.Contains(filter.Carro));
            }
            
            if (!string.IsNullOrEmpty(filter.Placa))
            {
                query = query.Where(a => a.GuiaPlaca.Contains(filter.Placa));
            }
            
            if (filter.AvaliacaoMinimo != null || filter.AvaliacaoMaximo != null)
            {
                var valorMinimo = filter.AvaliacaoMinimo ?? 0;
                var valorMaximo = filter.AvaliacaoMaximo ?? 5;

                query = query.Where(a => a.GuiaAvaliacao >= valorMinimo && a.GuiaAvaliacao <= valorMaximo);
            }

            // retorna o resultado
            return query;
        }

        public ValidationModel Valida(Usuario item)
        {
            //inicializa objeto
            var validation = new ValidationModel();

            //executa as validacoes
            if (string.IsNullOrEmpty(item.Nome))
            {
                validation.Valido = false;
                validation.Erros.Add("Informe o nome completo");
            }
            
            if (string.IsNullOrEmpty(item.Avatar))
            {
                validation.Valido = false;
                validation.Erros.Add("Informe a imagem");
            }
            
            if (string.IsNullOrEmpty(item.Sexo))
            {
                validation.Valido = false;
                validation.Erros.Add("Informe o sexo");
            }
            
            if (string.IsNullOrEmpty(item.Telefone))
            {
                validation.Valido = false;
                validation.Erros.Add("Informe o telefone");
            }
            
            if (string.IsNullOrEmpty(item.Email))
            {
                validation.Valido = false;
                validation.Erros.Add("Informe o email");
            }
            
            if (string.IsNullOrEmpty(item.Nome))
            {
                validation.Valido = false;
                validation.Erros.Add("Informe a senha");
            }

            // valida email cadastrado
            if (item.Id == 0)
            {
                var emailExiste = _db.Usuario.Any(a => a.Email == item.Email);

                if (emailExiste)
                {
                    validation.Valido = false;
                    validation.Erros.Add("Email já possui cadastro no sistema");
                }
            }

            // retorna o resultado
            return validation;
        }

        public async Task<Usuario> Insere(Usuario item)
        {
            // adiciona no banco de dados
            await _db.Usuario.AddAsync(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }

        public async Task<Usuario> Atualiza(Usuario item)
        {
            // atualiza no banco de dados
            _db.Usuario.Update(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }

        public async Task<Usuario> Deleta(int id)
        {
            // busca registro
            var item = await Busca(id);
            
            // remove do banco de dados
            _db.Usuario.Remove(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }
        
        public void Dispose()
        {
            _db.Dispose();
        }
    }
}