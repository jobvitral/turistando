using System;
using System.Collections.Generic;
using System.Drawing;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Turistando.WebApi.Helpers;

namespace Turistando.WebApi.Controllers
{
    [Route("upload")]
    public class UploadController : Controller
    {
        private readonly IWebHostEnvironment _environment;

        public UploadController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpPost("arquivo")]
        public async Task<ActionResult> UploadArquivos()
        {
            try
            {
                var result = new List<string>();
                var arquivos = Request.Form.Files;
                var prefix = "turistando";
                
                if(arquivos.Count > 0)
                {
                    foreach (var arquivo in arquivos)
                    {
                        //configura
                        var filename = ContentDispositionHeaderValue.Parse(arquivo.ContentDisposition).FileName.Trim().Replace("\"", "");
                        var nomeArquivo = $"{prefix}_{Guid.NewGuid().ToString()}.{filename.Substring(filename.LastIndexOf('.') + 1)}";
                        var rootFolder = $@"{_environment.WebRootPath}/assets/files";
                        var caminho = $@"{rootFolder}/{nomeArquivo}";

                        //salva no disco
                        await using (var fs = System.IO.File.Create(caminho))
                        {
                            //copia para o disco
                            await arquivo.CopyToAsync(fs);
                            await fs.FlushAsync();                            
                        }

                        //adiciona na lista
                        result.Add(nomeArquivo);
                    }

                    return Ok(result);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new ValidationModel(ex.Message));
            }
        }

        [HttpPost("imagem")]
        public async Task<ActionResult> UploadImagens()
        {
            try
            {
                var result = new List<string>();
                var arquivos = Request.Form.Files;
                const string prefix = "turistando";
                
                if(arquivos.Count > 0)
                {
                    foreach (var arquivo in arquivos)
                    {
                        //configura
                        var filename = ContentDispositionHeaderValue.Parse(arquivo.ContentDisposition).FileName.Trim().Replace("\"", "");
                        var nomeArquivo = $"{prefix}_{Guid.NewGuid().ToString()}.{filename.Substring(filename.LastIndexOf('.') + 1)}";
                        var rootFolder = $@"{_environment.WebRootPath}/assets/images";
                        var caminho = $@"{rootFolder}/{nomeArquivo}";

                        //salva no disco
                        await using (var fs = System.IO.File.Create(caminho))
                        {
                            //copia para o disco
                            await arquivo.CopyToAsync(fs);
                            await fs.FlushAsync();                            
                        }

                        //gera a miniatura
                        GeraThumbnail(rootFolder, nomeArquivo);

                        //adiciona na lista
                        result.Add(nomeArquivo);
                    }

                    return Ok(result);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new ValidationModel(ex.Message));
            }
        }
    
        public void GeraThumbnail(string rootPath, string filename)
        {
            var filePath = $"{rootPath}/{filename}";
            var path = $"{rootPath}/thumbs/{filename}";

            using var file = System.IO.File.OpenRead(filePath);
                
            //carrega a iamgem
            var image = Image.FromStream(file);
                    
            //configura os tamanhos
            var thumbHeight = (image.Height / 2) <= 250 ? (image.Height / 2) : 250;                    
            var thumbWidth = (image.Width * thumbHeight) / image.Height;
                    

            //gera o thumb
            Image thumb = image.GetThumbnailImage(thumbWidth, thumbHeight, () => false, IntPtr.Zero);

            //salva a imagem
            thumb.Save(path);
        }
    }
}