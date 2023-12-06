using Microsoft.AspNetCore.Mvc;

namespace bilkent_exchange_network.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SecondhandController : ControllerBase
    {
        private readonly ILogger<SecondhandController> _logger;

        public SecondhandController(ILogger<SecondhandController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetSecondhandItem")]
        public IEnumerable<SecondhandController> Get()
        {
            //TODO
            return null;
            
        }
    }
}
