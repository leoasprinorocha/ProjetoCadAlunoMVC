using ProjetoCadAluno.DOMAIN.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoCadAluno.DOMAIN.Models
{
    public class Aluno
    {
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public SituacaoAluno Situacao { get; set; }
        public int Matricula { get; set; }
        public DateTime DataRegistroAluno { get; set; }
        public DateTime DataUltimaAtualizacao { get; set; }



        
    }
}
