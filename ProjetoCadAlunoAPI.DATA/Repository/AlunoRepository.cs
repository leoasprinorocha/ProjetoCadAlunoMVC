using ProjetoCadAluno.DOMAIN.Interfaces.Repositories;
using ProjetoCadAluno.DOMAIN.Models;
using ProjetoCadAlunoAPI.DATA.Context;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ProjetoCadAlunoAPI.DATA.Repository
{
    public class AlunoRepository : IAlunoRepository
    {
        private readonly ProjetoCadAlunoContext _context;
        public AlunoRepository(ProjetoCadAlunoContext context)
        {
            _context = context;
        }

        public bool AtualizarAluno(Aluno aluno)
        {
            throw new NotImplementedException();
        }

        public Aluno CadastrarAluno(Aluno aluno)
        {

            _context.Aluno.Add(aluno);
            _context.SaveChanges();
            return aluno;
        }

        public List<Aluno> ListarAlunos() =>
            _context.Aluno.ToList();
        

        public bool RemoverAluno(int Matricula)
        {
            throw new NotImplementedException();
        }
    }
}
