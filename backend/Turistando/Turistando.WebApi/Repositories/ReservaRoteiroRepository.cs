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
    public class ReservaRoteiroRepository : IReservaRoteiro
    {
        private readonly TuristandoContext _db;

        public ReservaRoteiroRepository()
        {
            _db = new TuristandoContext();
        }
        
        public async Task<ReservaRoteiro> Busca(int idReserva, int idRoteiro)
        {
            // inicializa a consulta
            var query = await _db.ReservaRoteiro
                .FirstOrDefaultAsync(a => a.IdReserva == idReserva && a.IdRoteiro == idRoteiro);

            //retorna o resultado
            return query;
        }

        public async Task<ICollection<ReservaRoteiro>> Busca(ReservaRoteiroFilter filtro)
        {
            //inicializa a consulta
            var query = _db.ReservaRoteiro
                .Include(a => a.Reserva)
                .Include(a => a.Roteiro)
                .AsQueryable();

            // faz o filtro
            query = Filter(query, filtro);

            //retorna o resultado
            return await query.ToListAsync();
        }

        public IQueryable<ReservaRoteiro> Filter(IQueryable<ReservaRoteiro> query, ReservaRoteiroFilter filter)
        {
            // executa os filtros
            if (filter.Reservas != null)
            {
                query = query.Where(a => filter.Reservas.Contains(a.IdReserva));
            }
            
            if (filter.Roteiros != null)
            {
                query = query.Where(a => filter.Roteiros.Contains(a.IdRoteiro));
            }

            // retorna o resultado
            return query;
        }

        public ValidationModel Valida(ReservaRoteiro item)
        {
            //inicializa objeto
            var validation = new ValidationModel();

            //executa as validacoes
            if (item.IdReserva == 0)
            {
                validation.Valido = false;
                validation.Erros.Add("Informe a reserva");
            }
            
            if (item.IdRoteiro == 0)
            {
                validation.Valido = false;
                validation.Erros.Add("Informe o roteiro");
            }
            
            // retorna o resultado
            return validation;
        }

        public async Task<ReservaRoteiro> Insere(ReservaRoteiro item)
        {
            // adiciona no banco de dados
            await _db.ReservaRoteiro.AddAsync(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }

        public async Task<ReservaRoteiro> Atualiza(ReservaRoteiro item)
        {
            // atualiza no banco de dados
            _db.ReservaRoteiro.Update(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }

        public async Task<ReservaRoteiro> Deleta(int idReserva, int idRoteiro)
        {
            // busca registro
            var item = await Busca(idReserva, idRoteiro);
            
            // remove do banco de dados
            _db.ReservaRoteiro.Remove(item);
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