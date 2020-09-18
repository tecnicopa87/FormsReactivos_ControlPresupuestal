using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace reactiveForm.web.Models
{
    public class Producto
    {
        [Key]
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public float costo { get; set; }
        public DateTime Vigencia { get; set; }// sql2005 PC Win7 no soporte DateTime2
    }
}
