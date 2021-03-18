using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _usermanager;
        private readonly TokenService _tokenservice;
        private readonly SignInManager<AppUser> _signinmanager;

        public AccountController(UserManager<AppUser> userManager, 
            TokenService tokenService,
            SignInManager<AppUser> signInManager)
        {
            _usermanager = userManager;
            _tokenservice = tokenService;
            _signinmanager = signInManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _usermanager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized();

            var result = await _signinmanager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(result.Succeeded)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenservice.CreateToken(user),
                    UserName = user.UserName
                };
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await _usermanager.Users.AnyAsync(x=>x.Email == registerDto.Email))
            {
                return BadRequest("Email taken");
            }

            if (await _usermanager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                return BadRequest("Username taken");
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };

            var result = await _usermanager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenservice.CreateToken(user),
                    UserName = user.UserName
                };
            }

            return BadRequest("Problem reggistering user");
        }
    }
}
