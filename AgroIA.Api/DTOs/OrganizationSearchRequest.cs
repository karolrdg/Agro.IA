namespace AgroIA.Api.DTOs;

public class OrganizationSearchRequest
{
    public string? Name { get; set; }

    public string? Type { get; set; }

    public int Page { get; set; } = 1;

    public int PageSize { get; set; } = 10;
}