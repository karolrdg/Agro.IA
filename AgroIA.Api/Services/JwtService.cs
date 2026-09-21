using AgroIA.Api.Models;
using AgroIA.Api.Settings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AgroIA.Api.Services;

public class JwtService
{
    private readonly JwtSettings _settings;

    public JwtService(IOptions<JwtSettings> options)
    {
        _settings = options.Value;
    }

    public string GenerateToken(User user)
    {
       
        var claims = new[]
        {
            new Claim(
                ClaimTypes.NameIdentifier,
                user.Id.ToString()),

            new Claim(
                ClaimTypes.Name,
                user.Name),

            new Claim(
                ClaimTypes.Email,
                user.Email)
        };

        // Transforma a chave secreta em bytes
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_settings.Key));
        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        // Cria o token
        var token = new JwtSecurityToken(
            issuer: _settings.Issuer,
            audience: _settings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                _settings.ExpirationMinutes),
            signingCredentials: credentials);

        // Converte o token para texto
        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}