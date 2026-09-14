using Microsoft.AspNetCore.Mvc;


using AgroIA.Api.Services;
using Microsoft.AspNetCore.Mvc;

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
    public IActionResult GetOrganizations()
    {
        var organizations = _organizationService.GetOrganizations();

        return Ok(organizations);
    }
}