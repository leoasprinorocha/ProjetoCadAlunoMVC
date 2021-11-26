

using System.Threading.Tasks;

namespace ProjetoCadAluno.CLIENT.Interfaces
{
    public interface IClientBase
    {
        Task<T> GetAsync<T>(string controller, string action);

        Task<T> PostAsync<T>(string controller, string action, object objParameter);
    }
}
