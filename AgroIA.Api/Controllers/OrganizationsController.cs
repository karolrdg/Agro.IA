using Microsoft.AspNetCore.Mvc;
using AgroIA.Api.Services;
using AgroIA.Api.DTOs;


namespace AgroIA.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrganizationsController : ControllerBase
{
    private readonly OrganizationService _organizationService;

    public OrganizationsController(
        OrganizationService organizationService)
    {
        _organizationService = organizationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetOrganizations()
    {
        var organizations =
            await _organizationService.GetOrganizationsAsync();

        return Ok(organizations);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrganization(
    CreateOrganizationRequest request)
    {
        var organization =
            await _organizationService
                .CreateOrganizationAsync(request);

        return CreatedAtAction(
            nameof(GetOrganizations),
            new { id = organization.Id },
            organization);
    }
}