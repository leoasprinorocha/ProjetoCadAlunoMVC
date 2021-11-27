using Microsoft.AspNetCore.Mvc;
using ProjetoCadAluno.DOMAIN.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ProjetoCadAlunoMVC.Controllers
{
    public class AlunoController : Controller
    {
        public IActionResult Home()
        {
            TempData["ddlSitAluno"] = EnumToList();
            return View();
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
