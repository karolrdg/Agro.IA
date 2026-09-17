using AgroIA.Api.DTOs;
using AgroIA.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AgroIA.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;

    public UsersController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        RegisterUserRequest request)
    {
        try
        {
            var user =
                await _userService.RegisterAsync(request);

            return CreatedAtAction(
                nameof(Register),
                new { id = user.Id },
                user);
        }
        catch (Exception exception)
        {
            return BadRequest(new
            {
                message = exception.Message
            });
        }
    }
}