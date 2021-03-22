using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {

        private readonly IHttpContextAccessor _httpcontextaccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpcontextaccessor = httpContextAccessor;
        }


        public string GetUsername()
        {
            return _httpcontextaccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}
