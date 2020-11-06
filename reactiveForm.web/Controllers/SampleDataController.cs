using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace reactiveForm.web.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Parque Hundido", "Reforma", "Polanco", "Anzures", "Centro", "Los Pinos", "L. Cardenas", "Scorching","Tlanepantla"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                DateFinFormatted= DateTime.Now.AddDays(index+2).ToString("d"),
                Duracion = rng.Next(-20, 55),
                
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string  DateFormatted { get; set; }
            public string DateFinFormatted { get; set; }
            public int Duracion { get; set; }
            public int Asistentes
            {
                get
                {
                    return 32 + (int)(Duracion / 0.5556);
                }
            }
            public string Summary { get; set; }

           
        }
    }
}
