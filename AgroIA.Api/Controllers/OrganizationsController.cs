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
      [FromBody] CreateOrganizationRequest request)
    {
        try
        {
            var organization =
                await _organizationService
                    .CreateOrganizationAsync(request);

            return CreatedAtAction(
                nameof(GetOrganizations),
                new { id = organization.Id },
                organization);
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new
            {
                message = exception.Message
            });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrganization(
    int id,
    [FromBody] UpdateOrganizationRequest request)
    {
        var organization =
            await _organizationService
                .UpdateOrganizationAsync(id, request);

        if (organization is null)
        {
            return NotFound(new
            {
                message = "Organização não encontrada."
            });
        }

        return Ok(organization);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrganization(int id)
    {
        try
        {
            var deleted =
                await _organizationService
                    .DeleteOrganizationAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "A organização não foi encontrada."
                });
            }

            return NoContent();
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new
            {
                message = exception.Message
            });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrganizationById(int id)
    {
        var organization =
            await _organizationService
                .GetOrganizationByIdAsync(id);

        if (organization is null)
        {
            return NotFound(new
            {
                message = "Organização não encontrada."
            });
        }

        return Ok(organization);

    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchOrganizations(
     [FromQuery] string? name,
     [FromQuery] string? type,
     [FromQuery] int page = 1,
     [FromQuery] int pageSize = 10)
    {
        try
        {
            var organizations =
                await _organizationService
                    .SearchOrganizationsAsync(
                        name,
                        type,
                        page,
                        pageSize);

            return Ok(organizations);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new
            {
                message = exception.Message
            });
        }
    }
}