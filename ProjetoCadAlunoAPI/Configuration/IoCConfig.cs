using Microsoft.Extensions.DependencyInjection;
using ProjetoCadAlunoAPI.DATA.Context;
using ProjetoCadAlunoAPI.DATA.Interfaces;
using ProjetoCadAlunoAPI.DATA.Repository;

namespace ProjetoCadAlunoAPI.Configuration
{
    public static class IoCConfig
    {
        public static IServiceCollection AddIoCDependencies(this IServiceCollection services)
        {
            #region Repositories
            services.AddScoped<IPersistencia, PersistenciaBD>();
            services.AddScoped<ProjetoCadAlunoContext>();
            #endregion

            return services;
        }

        
       

    }
}
