using Microsoft.EntityFrameworkCore;
using ProjetoCadAluno.DOMAIN.Models;
using ProjetoCadAlunoAPI.DATA.Maps;
using System.Linq;
using System.Reflection;

namespace ProjetoCadAlunoAPI.DATA.Context
{

    public class ProjetoCadAlunoContext : DbContext
    {
        public ProjetoCadAlunoContext(DbContextOptions<ProjetoCadAlunoContext> options) : base(options) { }

        public DbSet<Aluno> Aluno { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AlunoMap());
            

        }
    }
}
