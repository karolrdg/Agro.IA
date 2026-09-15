using AgroIA.Api.Data;
using AgroIA.Api.Models;
using AgroIA.Api.DTOs;

namespace AgroIA.Api.Services;

public class OrganizationService
{
    private readonly OrganizationRepository _organizationRepository;

    public OrganizationService(
        OrganizationRepository organizationRepository)
    {
        _organizationRepository = organizationRepository;
    }

    public async Task<List<Organization>> GetOrganizationsAsync()
    {
        return await _organizationRepository
            .GetOrganizationsAsync();
    }

    public async Task<Organization> CreateOrganizationAsync(
    CreateOrganizationRequest request)
    {
        var organization = new Organization
        {
            Name = request.Name,
            Type = request.Type
        };

        return await _organizationRepository
            .CreateOrganizationAsync(organization);
    }
}
