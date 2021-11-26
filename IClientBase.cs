
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gerenciamento.CLIENT.Clients.Interfaces
{
    public interface IClientBase
    {
        Task<T> GetAsync<T>(string controller, string action, ApiConnections api);

        Task<T> PostAsync<T>(string controller, string action, object obj, ApiConnections api);
    }
}