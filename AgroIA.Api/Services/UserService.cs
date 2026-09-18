using AgroIA.Api.DTOs;
using AgroIA.Api.Repositories;

namespace AgroIA.Api.Services;

public class UserService
{
    private readonly UserRepository _userRepository;
    private readonly JwtService _jwtService;

    public UserService(
        UserRepository userRepository,
        JwtService jwtService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
    }

    public async Task<RegisterUserResponse> RegisterAsync(
        RegisterUserRequest request)
    {
        var existingUser =
            await _userRepository.GetByEmailAsync(request.Email);

        if (existingUser is not null)
        {
            throw new Exception("Este e-mail já está cadastrado.");
        }

        var passwordHash =
            BCrypt.Net.BCrypt.HashPassword(request.Password);

        var user = new Models.User
        {
            Name = request.Name,
            Email = request.Email,
            PasswordHash = passwordHash
        };

        var createdUser =
            await _userRepository.CreateAsync(user);

        return new RegisterUserResponse
        {
            Id = createdUser.Id,
            Name = createdUser.Name,
            Email = createdUser.Email,
            CreatedAt = createdUser.CreatedAt
        };
    }

    public async Task<LoginResponse> LoginAsync(
        LoginRequest request)
    {
        var user =
            await _userRepository.GetByEmailAsync(request.Email);

        if (user is null)
        {
            throw new Exception("E-mail ou senha inválidos.");
        }
        var validPassword =
            BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash);

        if (!validPassword)
        {
            throw new Exception("E-mail ou senha inválidos.");
        }
        var token =
            _jwtService.GenerateToken(user);

        return new LoginResponse
        {
            Token = token,
            UserId = user.Id,
            Name = user.Name,
            Email = user.Email
        };
    }
}