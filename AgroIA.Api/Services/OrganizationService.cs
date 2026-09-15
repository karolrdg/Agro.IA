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
        var organizationNameExists =
            await _organizationRepository
                .ExistsByNameAsync(request.Name);

        if (organizationNameExists)
        {
            throw new InvalidOperationException(
                "Já existe uma organização com esse nome.");
        }

        var organization = new Organization
        {
            Name = request.Name,
            Type = request.Type
        };

        return await _organizationRepository
            .CreateOrganizationAsync(organization);
    }

    public async Task<bool> OrganizationNameExistsAsync(string name)
    {
        return await _organizationRepository
            .ExistsByNameAsync(name);
    }
}
