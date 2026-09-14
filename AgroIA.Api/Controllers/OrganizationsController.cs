using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Mvc;

namespace AgroIA.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrganizationsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetOrganizations()
    {
        var organizations = new[]
        {
            new
            {
                id = 1,
                name = "SLC Agrícola",
                type = "Agricultural Company"
            },
            new
            {
                id = 2,
                name = "AgroTech Demo",
                type = "AgTech"
            }
        };

        return Ok(organizations);
    }
}