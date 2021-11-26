using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ProjetoCadAluno.CLIENT.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoCadAluno.CLIENT
{
    public class ClientBase : IClientBase
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public ClientBase(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<T> GetAsync<T>(string controller, string action)
        {
            string absoluteUrl = GetEndPointUrl() + $"{controller}/" + action;

            HttpRequestMessage request = new(HttpMethod.Get, absoluteUrl);

            HttpResponseMessage response = await _httpClient.SendAsync(request);

            string responseStream = await response.Content.ReadAsStringAsync();

            return Deserialize<T>(responseStream);
        }

        public async Task<T> PostAsync<T>(string controller, string action, object obj)
        {
            string absoluteUrl = GetEndPointUrl() + $"{controller}/" + action;

            HttpResponseMessage response = await _httpClient.PostAsync(absoluteUrl, GetHttpContent(obj));

            string responseStream = await response.Content.ReadAsStringAsync();

            T result = Deserialize<T>(responseStream);


            return result;
        }



        private HttpContent GetHttpContent(object objeto)
        {
            HttpContent httpContent;

            string objSerialized = JsonConvert.SerializeObject(objeto);

            httpContent = new StringContent(objSerialized, System.Text.Encoding.UTF8, "application/json");

            return httpContent;
        }


        private string GetEndPointUrl() =>
            _config.GetSection("RedirectApi").Value;

        private T Deserialize<T>(string response) => JsonConvert.DeserializeObject<T>(response);





    }
}
