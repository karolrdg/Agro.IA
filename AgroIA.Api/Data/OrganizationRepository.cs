using AgroIA.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AgroIA.Api.Data;

public class OrganizationRepository
{
    private readonly AgroIADbContext _context;

    public OrganizationRepository(AgroIADbContext context)
    {
        _context = context;
    }

    public async Task<List<Organization>> GetOrganizationsAsync()
    {
        return await _context.Organizations
            .AsNoTracking()
            .ToListAsync();
    }
}

