using Microsoft.AspNetCore.Identity;//*
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactiveForm.web.Models
{
    public class ApplicationUser: IdentityUser//* manualmente heredamos de IdentityUser
    {
    }
}
