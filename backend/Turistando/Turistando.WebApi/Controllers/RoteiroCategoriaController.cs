using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Turistando.WebApi.Filters;
using Turistando.WebApi.Models;
using Turistando.WebApi.Repositories;

namespace Turistando.WebApi.Controllers
{
    [Route("roteiro-categoria")]
    public class RoteiroCategoriaController : Controller
    {
        [HttpPost("busca")]
        public async Task<ActionResult> Get([FromBody] RoteiroCategoriaFilter item)
        {
            try
            {
                //carrega o repositorio
                using var repository = new RoteiroCategoriaRepository();

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

        [HttpGet("busca/roteiro/{idRoteiro}/categoria/{idCategoria}")]
        public async Task<ActionResult> Get(int idRoteiro, int idCategoria)
        {
            try
            {
                //carrega o repositorio
                using var repository = new RoteiroCategoriaRepository();

                //efetua a consulta
                var result = await repository.Busca(idRoteiro, idCategoria);

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
        public async Task<ActionResult> Insere([FromBody] RoteiroCategoria item)
        {
            try
            {
                //carrega o repositorio
                using var repository = new RoteiroCategoriaRepository();
                
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
        public async Task<ActionResult> Atualiza([FromBody] RoteiroCategoria item)
        {
            try
            {
                //carrega o repositorio
                using var repository = new RoteiroCategoriaRepository();
                
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

        [HttpDelete("deleta/roteiro/{idRoteiro}/categoria/{idCategoria}")]
        public async Task<ActionResult> Deleta(int idRoteiro, int idCategoria)
        {
            try
            {
                //carrega o repositorio
                var repository = new RoteiroCategoriaRepository();

                //efetua a consulta
                var result = await repository.Deleta(idRoteiro, idCategoria);

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