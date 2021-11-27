using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoCadAlunoAPI.DATA.Maps
{
    public abstract class BaseMapConfig
    {
        protected BaseMapConfig()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; protected set; }
    }

}

