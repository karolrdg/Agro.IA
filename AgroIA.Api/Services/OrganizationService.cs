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

    public async Task<Organization?> UpdateOrganizationAsync(
    int id,
    UpdateOrganizationRequest request)
    {
        var organization =
            await _organizationRepository.GetByIdAsync(id);

        if (organization is null)
        {
            return null;
        }

        organization.Name = request.Name;
        organization.Type = request.Type;

        return await _organizationRepository
            .UpdateOrganizationAsync(organization);
    }

    public async Task<bool> DeleteOrganizationAsync(int id)
    {
        var organization =
            await _organizationRepository.GetByIdAsync(id);

        if (organization is null)
        {
            return false;
        }

        await _organizationRepository
            .DeleteOrganizationAsync(organization);

        return true;
    }

    public async Task<Organization?> GetOrganizationByIdAsync(int id)
    {
        return await _organizationRepository
            .GetByIdAsync(id);
    }

    public async Task<PaginatedOrganizationsResponse>
        SearchOrganizationsAsync(
            string? name,
            string? type,
            int page,
            int pageSize)
    {
        // Verifica se o número da página é válido.
        if (page < 1)
        {
            throw new ArgumentException(
                "A página deve ser maior ou igual a 1.");
        }

        // Verifica se o tamanho da página é válido.
        if (pageSize < 1)
        {
            throw new ArgumentException(
                "O tamanho da página deve ser maior ou igual a 1.");
        }

        // Busca as organizações no repositório.
        return await _organizationRepository
            .SearchOrganizationsAsync(
                name,
                type,
                page,
                pageSize);
    }
}
