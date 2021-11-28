using Microsoft.AspNetCore.Mvc;
using ProjetoCadAluno.DOMAIN.Interfaces.Business;
using ProjetoCadAluno.DOMAIN.Models;

namespace ProjetoCadAlunoAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlunoController : ControllerBase
    {

        private readonly IAlunoBusiness _alunoBusiness;

        public AlunoController(IAlunoBusiness alunoBusiness)
        {
            _alunoBusiness = alunoBusiness;
        }

        [HttpGet]
        [Route("ListaAlunos")]
        public IActionResult ListaAlunos() =>
            Ok(_alunoBusiness.ListarAlunos());

        [HttpPost]
        [Route("CadastrarAluno")]
        public IActionResult CadastrarAluno(Aluno aluno) =>
            Ok(_alunoBusiness.CadastrarAluno(aluno));

    }
}
