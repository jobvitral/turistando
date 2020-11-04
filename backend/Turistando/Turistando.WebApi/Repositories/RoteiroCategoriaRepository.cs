using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Turistando.WebApi.Contexts;
using Turistando.WebApi.Filters;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Interfaces;
using Turistando.WebApi.Models;

namespace Turistando.WebApi.Repositories
{
    public class RoteiroCategoriaRepository : IRoteiroCategoria
    {
        private readonly TuristandoContext _db;

        public RoteiroCategoriaRepository()
        {
            _db = new TuristandoContext();
        }
        
        public async Task<RoteiroCategoria> Busca(int idRoteiro, int idCategoria)
        {
            // inicializa a consulta
            var query = await _db.RoteiroCategoria
                .FirstOrDefaultAsync(a => a.IdRoteiro == idRoteiro && a.IdCategoria == idCategoria);

            //retorna o resultado
            return query;
        }

        public async Task<ICollection<RoteiroCategoria>> Busca(RoteiroCategoriaFilter filtro)
        {
            //inicializa a consulta
            var query = _db.RoteiroCategoria
                .Include(a => a.Roteiro)
                .Include(a => a.Categoria)
                .AsQueryable();

            // faz o filtro
            query = Filter(query, filtro);

            //retorna o resultado
            return await query.ToListAsync();
        }

        public IQueryable<RoteiroCategoria> Filter(IQueryable<RoteiroCategoria> query, RoteiroCategoriaFilter filter)
        {
            // executa os filtros
            if (filter.Roteiros != null)
            {
                query = query.Where(a => filter.Roteiros.Contains(a.IdRoteiro));
            }
            
            if (filter.Categorias != null)
            {
                query = query.Where(a => filter.Categorias.Contains(a.IdCategoria));
            }

            // retorna o resultado
            return query;
        }

        public ValidationModel Valida(RoteiroCategoria item)
        {
            //inicializa objeto
            var validation = new ValidationModel();

            //executa as validacoes
            if (item.IdRoteiro == 0)
            {
                validation.Valido = false;
                validation.Erros.Add("Informe o roteiro");
            }
            
            if (item.IdCategoria == 0)
            {
                validation.Valido = false;
                validation.Erros.Add("Informe a categoria");
            }
            
            // retorna o resultado
            return validation;
        }

        public async Task<RoteiroCategoria> Insere(RoteiroCategoria item)
        {
            // adiciona no banco de dados
            await _db.RoteiroCategoria.AddAsync(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }

        public async Task<RoteiroCategoria> Atualiza(RoteiroCategoria item)
        {
            // atualiza no banco de dados
            _db.RoteiroCategoria.Update(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }

        public async Task<RoteiroCategoria> Deleta(int idRoteiro, int idCategoria)
        {
            // busca registro
            var item = await Busca(idRoteiro, idCategoria);
            
            // remove do banco de dados
            _db.RoteiroCategoria.Remove(item);
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