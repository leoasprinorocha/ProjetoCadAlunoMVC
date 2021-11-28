using ProjetoCadAluno.DOMAIN.Interfaces.Business;
using ProjetoCadAluno.DOMAIN.Interfaces.Repositories;
using ProjetoCadAluno.DOMAIN.Models;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace ProjetoCadAlunoAPI.BUSINESS.Business
{
    public class AlunoBusiness : IAlunoBusiness
    {

        private readonly IAlunoRepository _alunoRepository;

        public AlunoBusiness(IAlunoRepository alunoRepository)
        {
            _alunoRepository = alunoRepository;
        }

        public bool AtualizarAluno(Aluno aluno)
        {
            throw new NotImplementedException();
        }

        public Aluno CadastrarAluno(Aluno aluno)
        {
            aluno.DataRegistroAluno = DateTime.Now;
            aluno.DataUltimaAtualizacao = DateTime.Now;
            var alunoReturn = _alunoRepository.CadastrarAluno(aluno);

            return alunoReturn;
        }




        public List<Aluno> ListarAlunos() =>
            _alunoRepository.ListarAlunos();




        public bool RemoverAluno(int Matricula)
        {
            throw new NotImplementedException();
        }
    }
}
