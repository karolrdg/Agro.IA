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

    public async Task<Organization> CreateOrganizationAsync(
    Organization organization)
    {
        _context.Organizations.Add(organization);

        await _context.SaveChangesAsync();

        return organization;
    }
}

