using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Turistando.WebApi.Filters;
using Turistando.WebApi.Models;
using Turistando.WebApi.Repositories;

namespace Turistando.WebApi.Controllers
{
    [Route("reserva-roteiro")]
    public class ReservaRoteiroController : Controller
    {
        [HttpPost("busca")]
        public async Task<ActionResult> Get([FromBody] ReservaRoteiroFilter item)
        {
            try
            {
                //carrega o repositorio
                using var repository = new ReservaRoteiroRepository();

                //efetua a consulta
                var result = await repository.Busca(item);

                //retorna o resultado
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("busca/reserva/{idReserva}/roteiro/{idRoteiro}")]
        public async Task<ActionResult> Get(int idReserva, int idRoteiro)
        {
            try
            {
                //carrega o repositorio
                using var repository = new ReservaRoteiroRepository();

                //efetua a consulta
                var result = await repository.Busca(idReserva, idRoteiro);

                //retorna o resultado
                if(result != null)
                {
                    return Ok(result);
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("insere")]
        public async Task<ActionResult> Insere([FromBody] ReservaRoteiro item)
        {
            try
            {
                //carrega o repositorio
                using var repository = new ReservaRoteiroRepository();
                
                //efetua a validacao
                var validacao = repository.Valida(item);

                if (validacao.Valido)
                {
                    //efetua a consulta
                    var result = await repository.Insere(item);

                    //retorna o resultado
                    if(result != null)
                    {
                        return Ok(result);
                    }
                }
                else
                {
                    //retorna erro de validacao
                    return BadRequest(validacao);
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("atualiza")]
        public async Task<ActionResult> Atualiza([FromBody] ReservaRoteiro item)
        {
            try
            {
                //carrega o repositorio
                using var repository = new ReservaRoteiroRepository();
                
                //efetua a validacao
                var validacao = repository.Valida(item);

                if (validacao.Valido)
                {
                    //efetua a consulta
                    var result = await repository.Atualiza(item);

                    //retorna o resultado
                    if(result != null)
                    {
                        return Ok(result);
                    }
                }
                else
                {
                    //retorna erro de validacao
                    return BadRequest(validacao);
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("deleta/reserva/{idReserva}/roteiro/{idRoteiro}")]
        public async Task<ActionResult> Deleta(int idReserva, int idRoteiro)
        {
            try
            {
                //carrega o repositorio
                var repository = new ReservaRoteiroRepository();

                //efetua a consulta
                var result = await repository.Deleta(idReserva, idRoteiro);

                //retorna o resultado
                if(result != null)
                {
                    return Ok(result);
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}