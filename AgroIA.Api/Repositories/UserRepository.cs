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

    public async Task<List<User>> GetAllAsync()
    {
        return await _context.Users
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _context.Users
            .FirstOrDefaultAsync(user => user.Id == id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var user = await GetByIdAsync(id);

        if (user is null)
        {
            return false;
        }

        _context.Users.Remove(user);

        await _context.SaveChangesAsync();

        return true;
    }
}