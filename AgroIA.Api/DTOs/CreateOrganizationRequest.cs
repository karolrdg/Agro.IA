namespace AgroIA.Api.DTOs;

public class CreateOrganizationRequest
{
    public string Name { get; set; } = string.Empty;

    public string Type { get; set; } = string.Empty;
}