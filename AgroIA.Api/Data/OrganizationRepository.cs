using AgroIA.Api.Models;
using Microsoft.EntityFrameworkCore;
using AgroIA.Api.DTOs;

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

    public async Task<bool> ExistsByNameAsync(string name)
    {
        return await _context.Organizations
            .AnyAsync(organization => organization.Name == name);
    }

    public async Task<Organization?> GetByIdAsync(int id)
    {
        return await _context.Organizations
            .FirstOrDefaultAsync(organization => organization.Id == id);
    }

    public async Task<Organization?> UpdateOrganizationAsync(
    Organization organization)
    {
        _context.Organizations.Update(organization);

        await _context.SaveChangesAsync();

        return organization;
    }

    public async Task DeleteOrganizationAsync(
    Organization organization)
    {
        _context.Organizations.Remove(organization);

        await _context.SaveChangesAsync();
    }

    public async Task<PaginatedOrganizationsResponse>
     SearchOrganizationsAsync(
         string? name,
         string? type,
         int page,
         int pageSize)
    {
        var query = _context.Organizations
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(name))
        {
            query = query.Where(organization =>
                organization.Name.Contains(name));
        }

        if (!string.IsNullOrWhiteSpace(type))
        {
            query = query.Where(organization =>
                organization.Type.Contains(type));
        }

        var totalItems = await query.CountAsync();

        var organizations = await query
            .OrderBy(organization => organization.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var totalPages = (int)Math.Ceiling(
            totalItems / (double)pageSize);

        return new PaginatedOrganizationsResponse
        {
            Items = organizations,
            Page = page,
            PageSize = pageSize,
            TotalItems = totalItems,
            TotalPages = totalPages
        };
    }
}

