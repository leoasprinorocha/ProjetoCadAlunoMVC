using Microsoft.AspNetCore.Mvc;
using ProjetoCadAluno.CLIENT.Interfaces;
using ProjetoCadAluno.DOMAIN.Enums;
using ProjetoCadAluno.DOMAIN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoCadAlunoMVC.Controllers
{
    public class AlunoController : Controller
    {
        private readonly IClientBase _apiClient;

        public AlunoController(IClientBase apiClient)
        {
            _apiClient = apiClient;
        }


        [HttpGet]
        public IActionResult Home()
        {
            TempData["ddlSitAluno"] = EnumToList();
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> RetornaGridAlunos()
        {
            var listAlunos = await _apiClient.GetAsync<IEnumerable<Aluno>>("Aluno", "ListaAlunos");

            return PartialView("Grids\\_gridListaAlunos", listAlunos);
        }

        [HttpPost]
        public async Task<IActionResult> CadastrarAluno(Aluno aluno)
        {
            var alunoSave = await _apiClient.PostAsync<Aluno>("Aluno", "CadastrarAluno", aluno);
            return Json(alunoSave);
        }





        private List<object> EnumToList()
        {
            var listSit = Enum.GetValues(typeof(SituacaoAluno)).Cast<SituacaoAluno>().ToList();
            List<object> ddlSitAluno = new List<object>();
            
            foreach (var item in listSit)
            {
                ddlSitAluno.Add(new { Name = item.ToString(), Value = (int)item });
            }

            return ddlSitAluno;
        }
    }
}
