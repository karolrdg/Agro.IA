using AgroIA.Api.DTOs;
using AgroIA.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        LoginRequest request)
    {
        try
        {
            var response =
                await _userService.LoginAsync(request);

            return Ok(response);
        }
        catch (Exception exception)
        {
            return Unauthorized(new
            {
                message = exception.Message
            });
        }
    }
    [Authorize]
    [HttpGet("protected")]
    public IActionResult Protected()
    {
        return Ok(new
        {
            message = "Você está autenticada!",
            user = User.Identity?.Name
        });
    }
}