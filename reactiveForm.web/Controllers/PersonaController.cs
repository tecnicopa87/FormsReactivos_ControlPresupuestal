using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;//*
using Microsoft.AspNetCore.Mvc;
using reactiveForm.web.Models;
using Microsoft.AspNetCore.Authorization;//*
using Microsoft.AspNetCore.Authentication.JwtBearer;//*

namespace reactiveForm.web.Controllers
{
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/personas")]
    public class PersonaController : Controller
    {
        private readonly ApplicationDBContext _context;
        public PersonaController(ApplicationDBContext context)
        {
            _context = context;
        }
        // GET: api/Personas
        [HttpGet]        
        public IEnumerable<Persona> GetPerson()
        {
             return _context.Personas.ToList();
           // return new List<Persona>()
           //{
           //    new Persona(){ Id=1,Name="Joaquin Lopez",FechaNacimiento="02/05/1985",Email="santi@gmail.com"},
           //new Persona(){Id=2, Name="Lula Castillo",FechaNacimiento="02/05/1991",Email="lulachula@gmail.com"}
           //};
        }

        // POST: api/Persona
        [HttpPost]
        public async Task<IActionResult> PostPersona([FromBody] Persona persona)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Personas.Add(persona);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersona", new { id = persona.Id }, persona);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPersona([FromRoute] int id, bool incluirDirecciones = false)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Persona persona;

            if (incluirDirecciones)
            {
                persona = await _context.Personas.SingleOrDefaultAsync();//_context.Personas.Include(x => x.Direcciones).SingleOrDefaultAsync(m => m.Id == id);
            }
            else
            {
                persona = await _context.Personas.SingleOrDefaultAsync(m => m.Id == id);
            }

            if (persona == null)
            {
                return NotFound();
            }

            return Ok(persona);
        }

        // PUT: api/Persona/5
        [HttpPut]
        public IActionResult EditPersona( [FromBody] Persona model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Persona person;
            person=_context.Personas.SingleOrDefault(P => P.Id == model.Id);
            person.Name = model.Name;
            person.Email = model.Email;
            person.FechaNacimiento = model.FechaNacimiento;
            _context.Entry(person).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok(model);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var persona = await _context.Personas.SingleOrDefaultAsync(m => m.Id == id);
            if (persona == null)
            {
                return NotFound();
            }
            _context.Personas.Remove(persona);
            await _context.SaveChangesAsync();

            return Ok(persona);
        }
    }
}
