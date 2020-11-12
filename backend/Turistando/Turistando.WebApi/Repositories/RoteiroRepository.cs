using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Turistando.WebApi.Contexts;
using Turistando.WebApi.Filters;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Interfaces;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Repositories
{
    public class RoteiroRepository : IRoteiro
    {
        private readonly TuristandoContext _db;

        public RoteiroRepository()
        {
            _db = new TuristandoContext();
        }
        
        public async Task<Roteiro> Busca(int id)
        {
            // inicializa a consulta
            var query = await _db.Roteiro
                .FirstOrDefaultAsync(a => a.Id == id);

            //retorna o resultado
            return query;
        }

        public async Task<ICollection<Roteiro>> Busca(RoteiroFilter filtro)
        {
            //inicializa a consulta
            var query = _db.Roteiro
                .Include(a => a.Guia)
                .Include(a => a.RoteiroCategorias)
                    .ThenInclude(b => b.Categoria)
                .AsQueryable();

            // faz o filtro
            query = Filter(query, filtro);

            //retorna o resultado
            return await query.ToListAsync();
        }

        public IQueryable<Roteiro> Filter(IQueryable<Roteiro> query, RoteiroFilter filter)
        {
            // executa os filtros
            if (filter.Ids != null)
            {
                query = query.Where(a => filter.Ids.Contains(a.Id));
            }
            
            if (filter.Guias != null)
            {
                query = query.Where(a => filter.Guias.Contains(a.IdGuia));
            }

            if (!string.IsNullOrEmpty(filter.Nome))
            {
                query = query.Where(a => a.Nome.Contains(filter.Nome));
            }

            if (filter.Categorias != null)
            {
                query = query.Where(a => a.RoteiroCategorias.Any(b => filter.Categorias.Contains(b.IdCategoria)));
            }
            
            if (filter.Cidades != null)
            {
                query = query.Where(a => filter.Cidades.Contains(a.Cidade));
            }
            
            if (filter.Estados != null)
            {
                query = query.Where(a => filter.Estados.Contains(a.Estado));
            }

            if (filter.ValorMinimo != null || filter.ValorMaximo != null)
            {
                var valorMinimo = filter.ValorMinimo ?? 0;
                var valorMaximo = filter.ValorMaximo ?? double.MaxValue;

                query = query.Where(a => a.Valor >= valorMinimo && a.Valor <= valorMaximo);
            }
            
            // retorna o resultado
            return query;
        }

        public ValidationModel Valida(Roteiro item)
        {
            //inicializa objeto
            var validation = new ValidationModel();

            //executa as validacoes
            if (item.IdGuia == 0)
            {
                validation.Valido = false;
                validation.Erros.Add("Informe o guia");
            }

            // retorna o resultado
            return validation;
        }

        public async Task<Roteiro> Insere(Roteiro item)
        {
            // adiciona no banco de dados
            await _db.Roteiro.AddAsync(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }

        public async Task<Roteiro> Atualiza(Roteiro item)
        {
            // atualiza no banco de dados
            _db.Roteiro.Update(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }

        public async Task<Roteiro> Deleta(int id)
        {
            // busca registro
            var item = await Busca(id);
            
            // remove do banco de dados
            _db.Roteiro.Remove(item);
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