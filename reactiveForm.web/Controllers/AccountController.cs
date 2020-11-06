using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using reactiveForm.web.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace reactiveForm.web.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            this._configuration = configuration;
        }

        [Route("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserInfo model)
        {                      
            if (ModelState.IsValid)
            {//  #Si no cumple con reglas de contraseña va mandar como Badrequest#                
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    using (StreamWriter sw=new StreamWriter(@"C:\directorio\ErroresService.err",true))
                    {
                       sw.Write("WebAPI_CoreAngular:(Registro Exitoso)"); 
                    } 
                    return BuildToken(model);
                }
                else
                {
                      using (StreamWriter sw=new StreamWriter(@"C:\directorio\ErroresService.err",true))
                    {
                       sw.Write("WebAPI_CoreAngular:(Datos incorrectos)"+result.Errors); 
                    }  
                    ModelState.AddModelError("ErrorCreated", "Longitud debe ser 6 caracteres,minusculas");
                    return BadRequest(ModelState);
                }
            }
            else
            {
                using (StreamWriter sw=new StreamWriter(@"C:\directorio\ErroresService.err",true))
                    {
                       sw.Write("WebAPI_CoreAngular:(Model invalido)"+ModelState.ToString()); 
                    }   
                return BadRequest(ModelState);
            }                          
                    

        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserInfo userInfo)                    
         {          
             using (StreamWriter sw=new StreamWriter(@"C:\directorio\ErroresService.err",true))
                    {
                       sw.Write("WebAPI_CoreAngular:(entro login)"+userInfo.Password); 
                    }     
            if (ModelState.IsValid)
            {                                                                   
                  var result = await _signInManager.PasswordSignInAsync(userInfo.Email, userInfo.Password, isPersistent: false, lockoutOnFailure: false);
  
                if (result.Succeeded)
                {
                    
                    return BuildToken(userInfo);                     
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Intento de login no válido.");
                    return BadRequest(ModelState);
                }                           
                    
            }
            else
            {                  
                return BadRequest(ModelState);
               
            }                  
                 
            
        }

        private IActionResult BuildToken(UserInfo userInfo)
        {
            try
            {
                 var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, userInfo.Email),                
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),                
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["LLAVE_SECRETA"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddHours(2);

            JwtSecurityToken token = new JwtSecurityToken(
               issuer: "yourdomain.com",
               audience: "yourdomain.com",
               claims: claims,
               expires: expiration,
               signingCredentials: creds);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = expiration
            });
            }
            catch (System.Exception ex)
            {
                
               using (StreamWriter sw=new StreamWriter(@"C:\directorio\ErroresService.err",true))
                    {
                       sw.Write("WebAPI_CoreAngular:(Al construir token)"+ex.Message); 
                    } 
            }
           return BadRequest("No genero token");

        }

    }
}