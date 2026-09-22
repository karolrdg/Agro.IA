namespace AgroIA.Api.DTOs.RuralProperties;

public class CreateRuralPropertyRequest
{
    public string Name { get; set; } = string.Empty;

    public string Location { get; set; } = string.Empty;

    public decimal AreaInHectares { get; set; }

    public int OrganizationId { get; set; }
}