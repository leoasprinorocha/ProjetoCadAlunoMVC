using Microsoft.Extensions.DependencyInjection;
using ProjetoCadAluno.DOMAIN.Interfaces.Business;
using ProjetoCadAluno.DOMAIN.Interfaces.Repositories;
using ProjetoCadAlunoAPI.BUSINESS.Business;
using ProjetoCadAlunoAPI.DATA.Context;
using ProjetoCadAlunoAPI.DATA.Repository;

namespace ProjetoCadAlunoAPI.Configuration
{
    public static class IoCConfig
    {
        public static IServiceCollection AddIoCDependencies(this IServiceCollection services)
        {
            #region Repositories
            services.AddScoped<IAlunoRepository, AlunoRepository>();
            services.AddScoped<ProjetoCadAlunoContext>();
            #endregion

            #region Business
            services.AddScoped<IAlunoBusiness, AlunoBusiness>();
            #endregion
            
            return services;
        }

        
       

    }
}
