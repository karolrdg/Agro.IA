using AgroIA.Api.Data;
using AgroIA.Api.Models;

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
}
