using ProjetoCadAluno.DOMAIN.Models;
using ProjetoCadAlunoAPI.DATA.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoCadAlunoAPI.DATA.Repository
{
    public class PersistenciaArquivo : IPersistencia
    {
        public bool AtualizarAluno(Aluno aluno)
        {
            throw new NotImplementedException();
        }

        public Aluno CadastrarAluno(Aluno aluno)
        {
            throw new NotImplementedException();
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
