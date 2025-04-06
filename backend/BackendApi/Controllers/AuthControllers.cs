using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api")] 
    public class AuthController : ControllerBase
    {
        public class LoginRequest
        {
            [Required(ErrorMessage = "Email is required")]
            [EmailAddress(ErrorMessage = "Invalid email address")]
            public string? Email { get; set; }

            [Required(ErrorMessage = "Missing password")]
            public string? Password { get; set; }
        }

        public class ValidationError
        {
            public string Field { get; set; } = "";
            public string Message { get; set; } = "";
        }

        private readonly List<LoginRequest> validUsers = new()
        {
            new LoginRequest { Email = "test@test.com", Password = "Password123" }
        };

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Server-side model validation
            if (!ModelState.IsValid)
            {
                var validationErrors = ModelState
                    .Where(ms => ms.Value?.Errors.Count > 0)
                    .Select(ms => new ValidationError
                    {
                        Field = ms.Key,
                        Message = ms.Value?.Errors.First().ErrorMessage ?? "Invalid"
                    })
                    .ToList();

                return BadRequest(new
                {
                    message = "Validation failed",
                    errors = validationErrors
                });
            }

            // Check user exists
            bool isValid = validUsers.Any(user =>
                user.Email == request.Email &&
                user.Password == request.Password
            );

            if (!isValid)
            {
                return Unauthorized(new { message = "Invalid password" });
            }

            return Ok(new { message = "Login successful" });
        }
    }
}
