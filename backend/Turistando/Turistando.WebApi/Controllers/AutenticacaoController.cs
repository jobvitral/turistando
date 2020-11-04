using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Turistando.WebApi.Helpers;
using Turistando.WebApi.Repositories;

namespace Turistando.WebApi.Controllers
{
    [Route("autenticacao")]
    public class AutenticacaoController : Controller
    {
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginModel item)
        {
            try
            {
                // carrega o repositorio
                using var repository = new AutenticacaoRepository();
                
                // efetua a validacao
                var validacao = repository.Valida(item);
                
                // verifica validacao
                if (validacao.Valido)
                {
                    // efetua a consulta
                    var result = await repository.Login(item);

                    // retorna o resultado
                    if(result != null)
                    {
                        return Ok(result);
                    }
                }
                else
                {
                    // retorna os erros de validacao
                    return BadRequest(validacao);
                }

                // retorna nulo
                return NoContent();
            }
            catch (System.Exception ex)
            {
                // retorna uma excecao
                return BadRequest(ex);
            }
        }
    }
}