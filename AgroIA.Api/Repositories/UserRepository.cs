using AgroIA.Api.Data;
using AgroIA.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AgroIA.Api.Repositories;

public class UserRepository
{
    private readonly AgroIADbContext _context;

    public UserRepository(AgroIADbContext context)
    {
        _context = context;
    }


    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users
            .FirstOrDefaultAsync(user => user.Email == email);
    }


    public async Task<User> CreateAsync(User user)
    {
        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return user;
    }
}