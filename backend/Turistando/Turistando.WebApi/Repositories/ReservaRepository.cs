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
    public class ReservaRepository : IReserva
    {
        private readonly TuristandoContext _db;

        public ReservaRepository()
        {
            _db = new TuristandoContext();
        }
        
        public async Task<Reserva> Busca(int id)
        {
            // inicializa a consulta
            var query = await _db.Reserva
                .FirstOrDefaultAsync(a => a.Id == id);

            //retorna o resultado
            return query;
        }

        public async Task<ICollection<Reserva>> Busca(ReservaFilter filtro)
        {
            //inicializa a consulta
            var query = _db.Reserva
                .Include(a => a.ReservaRoteiros)
                    .ThenInclude(b => b.Roteiro)
                .AsQueryable();

            // faz o filtro
            query = Filter(query, filtro);

            //retorna o resultado
            return await query.ToListAsync();
        }

        public IQueryable<Reserva> Filter(IQueryable<Reserva> query, ReservaFilter filter)
        {
            // executa os filtros
            if (filter.Ids != null)
            {
                query = query.Where(a => filter.Ids.Contains(a.Id));
            }
            
            if (filter.Turista != null)
            {
                query = query.Where(a => a.IdTurista == filter.Turista);
            }
            
            if (filter.Guia != null)
            {
                query = query.Where(a => a.IdGuia == filter.Guia);
            }
            
            if (filter.Roteiros != null)
            {
                query = query.Where(a => a.ReservaRoteiros.Any(b => filter.Roteiros.Contains(b.IdRoteiro)));
            }

            if (filter.DataCriacaoInicio != null || filter.DataCriacaoFim != null)
            {
                var dataCriacaoInicio = filter.DataCriacaoInicio ?? DateTime.Today.AddYears(-100);
                var dataCriacaoFim = filter.DataCriacaoFim ?? DateTime.Today.AddYears(100);

                query = query.Where(a => a.DataCriacao >= dataCriacaoInicio && a.DataCriacao <= dataCriacaoFim);
            }
            
            if (filter.DataReservaInicio != null || filter.DataReservaFim != null)
            {
                var dataReservaInicio = filter.DataReservaInicio ?? DateTime.Today.AddYears(-100);
                var dataReservaFim = filter.DataReservaFim ?? DateTime.Today.AddYears(100);

                query = query.Where(a => a.DataReserva >= dataReservaInicio && a.DataCriacao <= dataReservaFim);
            }

            // retorna o resultado
            return query;
        }

        public ValidationModel Valida(Reserva item)
        {
            //inicializa objeto
            var validation = new ValidationModel();

            //executa as validacoes
            if (item.IdGuia == 0)
            {
                validation.Valido = false;
                validation.Erros.Add("Informe o guia");
            }
            
            if (item.IdTurista == 0)
            {
                validation.Valido = false;
                validation.Erros.Add("Informe o turista");
            }

            // retorna o resultado
            return validation;
        }

        public async Task<Reserva> Insere(Reserva item)
        {
            // adiciona no banco de dados
            await _db.Reserva.AddAsync(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }

        public async Task<Reserva> Atualiza(Reserva item)
        {
            // atualiza no banco de dados
            _db.Reserva.Update(item);
            await _db.SaveChangesAsync();

            //retorna o resultado
            return item;
        }

        public async Task<Reserva> Deleta(int id)
        {
            // busca registro
            var item = await Busca(id);
            
            // remove do banco de dados
            _db.Reserva.Remove(item);
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