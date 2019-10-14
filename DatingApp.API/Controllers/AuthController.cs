using System.Threading.Tasks;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;

namespace DatingApp.API.Controllers
{
  
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {

            userForRegisterDto.username = userForRegisterDto.username.ToLower();
            if (await _repo.UserExist(userForRegisterDto.username))
                return BadRequest("Username alreadyy exist.");

            var userTocreate = new User
            {
                Username = userForRegisterDto.username
            };

            var createUser = await _repo.Register(userTocreate, userForRegisterDto.password);
            return StatusCode(201);
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
           
            var UserFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (UserFromRepo == null)
                return Unauthorized();

            var claims = new[] {
                new Claim( ClaimTypes.NameIdentifier , UserFromRepo.Id.ToString()),
                new Claim( ClaimTypes.Name , UserFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials (key, SecurityAlgorithms.HmacSha512Signature);

            var tokendescriptor = new SecurityTokenDescriptor {
              
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds 

            };
 
            var tokenhandler = new JwtSecurityTokenHandler(); 

            var token = tokenhandler.CreateToken(tokendescriptor);

            return Ok( new {
                token = tokenhandler.WriteToken(token)
            });

        }

    }
}