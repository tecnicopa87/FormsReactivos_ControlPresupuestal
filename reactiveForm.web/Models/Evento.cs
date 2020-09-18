using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace reactiveForm.web.Models
{
    public class Evento
    {
        [Key]
        public int IdEvento { get; set; }
        [Required(ErrorMessage ="El nombre del evento es obligatorio")]
        public string Nombre { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime Fechafin { get; set; }
        public TimeSpan Duracion { get; set; }
        public int NoAsistentes { get; set; }
        public string ProductosPromocionar { get; set; }//List<string> correspondería a un DTO(DataTranferObject)
        public string IdsMedicos { get; set; }//List<int> no es un dato primitive y no es soportado en una BD

        public string Responsable { get; set; }

        public float PresupuestoAutorizado { get; set; }
        public string LugarEvento { get; set; }
        public string Comentarios { get; set; }

    }
}
