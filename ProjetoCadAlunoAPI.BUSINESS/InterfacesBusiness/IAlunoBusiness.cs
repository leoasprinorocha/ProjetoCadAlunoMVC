﻿using ProjetoCadAluno.DOMAIN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoCadAlunoAPI.BUSINESS.InterfacesBusiness
{
    public interface IAlunoBusiness
    {
        List<Aluno> ListarAlunos();
        Aluno CadastrarAluno(Aluno aluno);
        bool RemoverAluno(int Matricula);

        bool AtualizarAluno(Aluno aluno);
    }
}
