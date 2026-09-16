using AgroIA.Api.Models;

namespace AgroIA.Api.DTOs;

public class PaginatedOrganizationsResponse
{
    public List<Organization> Items { get; set; } = new();

    public int Page { get; set; }

    public int PageSize { get; set; }

    public int TotalItems { get; set; }

    public int TotalPages { get; set; }
}