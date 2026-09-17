using AgroIA.Api.DTOs;
using AgroIA.Api.Models;
using AgroIA.Api.Repositories;

namespace AgroIA.Api.Services;

public class UserService
{
    private readonly UserRepository _userRepository;

    public UserService(UserRepository userRepository)
    {
        _userRepository = userRepository;
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

       
        var user = new User
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
}