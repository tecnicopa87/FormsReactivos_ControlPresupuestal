using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using reactiveForm.web.Models;

namespace reactiveForm.web.Controllers
{
    [Route("api/[controller]")]
    public class EventoController : Controller
    {
        private readonly ApplicationDBContext DBContext;

        [HttpGet("[action]")]
        public IEnumerable<string> ZonasEvento ()
        {
            string[] zonas = { "Parque Hundido", "Reforma", "Polanco", "Anzures", "Centro", "Los Pinos", "L. Cardenas", "Autodromo", "Tlanepantla" };
            return zonas;
        }
        public EventoController(ApplicationDBContext dBContext)
        {
            DBContext = dBContext;
        }
        [HttpPost]
        public IActionResult GuardarEvento([FromBody]DTOEventos model)
        {
            try
            {
                Evento evento = new Evento();
                evento.Nombre = model.Nombreevento;
                evento.FechaInicio = Convert.ToDateTime(model.dateFormatted);
                evento.Fechafin = Convert.ToDateTime(model.dateFinFormatted);
                DateTime Actual = model.dateFormatted.AddHours(model.duracion);
                TimeSpan time = TimeSpan.FromHours(Actual.Hour);
                evento.Duracion = time;
                evento.NoAsistentes = model.asistentes;
                evento.LugarEvento = model.Summary;

                DBContext.Add(evento);
                DBContext.SaveChanges();
                return Created("/",model);
            }
            catch(Exception ex)
            {
                ModelState.AddModelError("301", ex.Message);
                return BadRequest(ModelState);
            }
            

        }
        [HttpGet("[action]")]
        public IEnumerable<DTOEventos> ListaEventos()
        {
                        
            List<DTOEventos> eventos = new List<DTOEventos>();
             var query = (from ev in DBContext.Eventos
                         select new {ev.IdEvento, ev.FechaInicio, ev.Fechafin, ev.Duracion, ev.NoAsistentes,ev.LugarEvento }).ToList();

            foreach(var e in query)
            {
                DTOEventos dtoEvent = new DTOEventos();
                dtoEvent.dateFormatted = e.FechaInicio;
                dtoEvent.dateFinFormatted = e.Fechafin;
                dtoEvent.duracion = e.Duracion.Hours;//Duracion es TimeSpan en BD
                dtoEvent.asistentes = e.NoAsistentes;
                dtoEvent.Summary = e.LugarEvento;
                dtoEvent.IdEvento = e.IdEvento;
                eventos.Add(dtoEvent);
            }
            
            return eventos;

        }
        [HttpGet("[action]/{id}")]
        public  DTOEventos getEvento(int id)
        {
            DTOEventos dto = new DTOEventos();
            if (id==0)
            {                                
                return dto;
            }
            var obj = (from v in DBContext.Eventos
                       where v.IdEvento == id
                       select new { v.IdEvento,v.Nombre, v.FechaInicio, v.Fechafin, v.Duracion, v.NoAsistentes, v.LugarEvento }).First();
            dto.IdEvento = obj.IdEvento;
            dto.Nombreevento = obj.Nombre;
            dto.dateFormatted = obj.FechaInicio;
            dto.dateFinFormatted = obj.Fechafin; 
            dto.duracion = obj.Duracion.Hours;// int duracion=> TimeSpan Duracion
            dto.asistentes = obj.NoAsistentes;
            dto.Summary = obj.LugarEvento;
            return dto;
        }

        public class DTOEventos
        {
            public DateTime dateFormatted { get; set; }
            public DateTime dateFinFormatted { get; set; }
            public int duracion { get; set; }
            public int asistentes
            {
                get;set;
            }
            public string Summary { get; set; }
            public int IdEvento { get; set; }
            public string Nombreevento { get; set; }


        }
    }
}
