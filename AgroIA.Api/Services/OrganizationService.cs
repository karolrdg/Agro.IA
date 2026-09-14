using AgroIA.Api.Models;

namespace AgroIA.Api.Services;

public class OrganizationService
{
    public List<Organization> GetOrganizations()
    {
        return new List<Organization>
        {
            new Organization
            {
                Id = 1,
                Name = "Empresa Rural Demo",
                Type = "Agricultural Company"
            },
            new Organization
            {
                Id = 2,
                Name = "AgroTech Demo",
                Type = "AgTech"
            }
        };
    }
}
