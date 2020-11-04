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
    public class CategoriaRepository : ICategoria
    {
        private readonly TuristandoContext _db;

        public CategoriaRepository()
        {
            _db = new TuristandoContext();
        }
        
        public async Task<Categoria> Busca(int id)
        {
            // inicializa a consulta
            var query = await _db.Categoria
                .FirstOrDefaultAsync(a => a.Id == id);

            //retorna o resultado
            return query;
        }

        public async Task<ICollection<Categoria>> Busca(CategoriaFilter filtro)
        {
            //inicializa a consulta
            var query = _db.Categoria
                .AsQueryable();

            // faz o filtro
            query = Filter(query, filtro);

            //retorna o resultado
            return await query.ToListAsync();
        }

        public IQueryable<Categoria> Filter(IQueryable<Categoria> query, CategoriaFilter filter)
        {
            // executa os filtros
            if (filter.Ids != null)
            {
                query = query.Where(a => filter.Ids.Contains(a.Id));
            }

            if (!string.IsNullOrEmpty(filter.Nome))
            {
                query = query.Where(a => a.Nome.Contains(filter.Nome));
            }

            // retorna o resultado
            return query;
        }

        public ValidationModel Valida(Categoria item)
        {
            //inicializa objeto
            var validation = new ValidationModel();

            //executa as validacoes
            if (string.IsNullOrEmpty(item.Nome))
            {
                validation.Valido = false;
                validation.Erros.Add("Informe o nome da categoria");
            }
            
            // retorna o resultado
            return validation;
        }

        public async Task<Categoria> Insere(Categoria item)
        {
            // adiciona no banco de dados
            await _db.Categoria.AddAsync(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }

        public async Task<Categoria> Atualiza(Categoria item)
        {
            // atualiza no banco de dados
            _db.Categoria.Update(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }

        public async Task<Categoria> Deleta(int id)
        {
            // busca registro
            var item = await Busca(id);
            
            // remove do banco de dados
            _db.Categoria.Remove(item);
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