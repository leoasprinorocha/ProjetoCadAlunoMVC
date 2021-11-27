using ProjetoCadAluno.DOMAIN.Models;
using ProjetoCadAlunoAPI.DATA.Context;
using ProjetoCadAlunoAPI.DATA.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoCadAlunoAPI.DATA.Repository
{
    

    public class PersistenciaBD : IPersistencia
    {

        private readonly ProjetoCadAlunoContext _context;

        public PersistenciaBD(ProjetoCadAlunoContext context)
        {
            _context = context;
        }

        public bool AtualizarAluno(Aluno aluno)
        {
            throw new NotImplementedException();
        }

        public Aluno CadastrarAluno(Aluno aluno)
        {
            using (_context)
            {
                _context.Aluno.Add(aluno);
                _context.SaveChanges();

                var alunoReturn = aluno;
                return alunoReturn;
            }

        }

        public List<Aluno> ListarAlunos()
        {
            throw new NotImplementedException();
        }

        public bool RemoverAluno(int Matricula)
        {
            throw new NotImplementedException();
        }
    }
}
