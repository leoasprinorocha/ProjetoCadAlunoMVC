using ProjetoCadAluno.DOMAIN.Factory.Persistencia;
using ProjetoCadAluno.DOMAIN.Interfaces;
using ProjetoCadAluno.DOMAIN.Interfaces.Repositories;
using ProjetoCadAlunoAPI.DATA.Context;
using ProjetoCadAlunoAPI.DATA.Repository;

namespace ProjetoCadAlunoAPI.FACTORY.Factories
{
    public class PersistenciaFactory : PersistenciaFactoryMethod
    {
        private readonly ProjetoCadAlunoContext _context;

        public PersistenciaFactory(ProjetoCadAlunoContext context)
        {
            _context = context;
        }

        public override IPersistencia CriaPersistencia(int tipoPersistencia)
        {
            IPersistencia persistenciaReturn;
            

            if(tipoPersistencia == 1)
            {
                persistenciaReturn = new PersistenciaBD(_context);
                return persistenciaReturn;
            }
            else
            {
                persistenciaReturn = new PersistenciaArquivo();
                return persistenciaReturn;
            }
        }
    }
}
