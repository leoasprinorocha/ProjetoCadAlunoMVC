using Microsoft.Extensions.DependencyInjection;
using ProjetoCadAluno.CLIENT;
using ProjetoCadAluno.CLIENT.Interfaces;

namespace ProjetoCadAlunoMVC.Configuration
{
    public static class IoCConfig
    {
        public static IServiceCollection AddHelperServices(this IServiceCollection services)
        {
            services.AddSingleton<IClientBase, ClientBase>();
            
            return services;
        }
    }
}
