using ProjetoCadAluno.DOMAIN.Enums;
using System;


namespace ProjetoCadAluno.DOMAIN.Models
{
    public class Aluno
    {
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public SituacaoAluno Situacao { get; set; }
        public int Matricula { get; set; }
        public string CpfAluno { get; set; }
        public DateTime DataRegistroAluno { get; set; }
        public DateTime DataUltimaAtualizacao { get; set; }




    }
}
