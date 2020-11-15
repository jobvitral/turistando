using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Turistando.WebApi.Filters;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Models;
using Turistando.WebApi.Repositories;

namespace Turistando.WebApi.Controllers
{
    [Route("usuario")]
    public class UsuarioController : Controller
    {
        [HttpPost("busca")]
        public async Task<ActionResult> Get([FromBody] UsuarioFilter item)
        {
            try
            {
                //carrega o repositorio
                using var repository = new UsuarioRepository();

                //efetua a consulta
                var result = await repository.Busca(item);

                //retorna o resultado
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new ValidationModel(ex.Message));
            }
        }

        [HttpGet("busca/{id}")]
        public async Task<ActionResult> Get(int id)
        {
            try
            {
                //carrega o repositorio
                using var repository = new UsuarioRepository();

                //efetua a consulta
                var result = await repository.Busca(id);

                //retorna o resultado
                if(result != null)
                {
                    return Ok(result);
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new ValidationModel(ex.Message));
            }
        }

        [HttpPost("insere")]
        public async Task<ActionResult> Insere([FromBody] Usuario item)
        {
            try
            {
                //carrega o repositorio
                using var repository = new UsuarioRepository();
                
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
                return BadRequest(new ValidationModel(ex.Message));
            }
        }

        [HttpPut("atualiza")]
        public async Task<ActionResult> Atualiza([FromBody] Usuario item)
        {
            try
            {
                //carrega o repositorio
                using var repository = new UsuarioRepository();
                
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
                return BadRequest(new ValidationModel(ex.Message));
            }
        }

        [HttpDelete("deleta/{id}")]
        public async Task<ActionResult> Deleta(int id)
        {
            try
            {
                //carrega o repositorio
                var repository = new UsuarioRepository();

                //efetua a consulta
                var result = await repository.Deleta(id);

                //retorna o resultado
                if(result != null)
                {
                    return Ok(result);
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new ValidationModel(ex.Message));
            }
        }
    }
}