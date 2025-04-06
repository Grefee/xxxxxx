using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class ClientsController : ControllerBase
    {
        public class Client
        {
            public string Name { get; set; } = "";
            public string Nationality { get; set; } = "";
            public string Occupation { get; set; } = "";
            public string Email { get; set; } = "";
        }

        [HttpGet("clients")]
        public IActionResult GetClients()
        {
            var data = new List<Client>
            {
                new Client { Name = "Declan Welch", Nationality = "CZ", Occupation = "IT", Email = "declan.welch@pepega.com" },
                new Client { Name = "Mariah Vu", Nationality = "CZ", Occupation = "HR", Email = "mariah.vu@pepega.com" },
                new Client { Name = "Miley Soto", Nationality = "CZ", Occupation = "LOG", Email = "miley.soto@pepega.com" },
                new Client { Name = "Barrett Stein", Nationality = "CZ", Occupation = "QUA", Email = "barret.stein@pepega.com" },
                new Client { Name = "Brycen Barajas", Nationality = "CZ", Occupation = "IT", Email = "brycen.barajas@pepega.com" },
                new Client { Name = "Warren Patrick", Nationality = "CZ", Occupation = "MAN", Email = "warren.patrick@pepega.com" },
                new Client { Name = "Holden Pittman", Nationality = "CZ", Occupation = "HR", Email = "holden.pittman@pepega.com" },
                new Client { Name = "Miller Jarvis", Nationality = "CZ", Occupation = "HR", Email = "miller.jarvis@pepega.com" },
            };

            return Ok(data); // returns JSON with 200 status
        }
    }
}
