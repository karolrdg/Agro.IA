namespace AgroIA.Api.Domain.Entities;

public class RuralProperty
{
    public int Id { get; private set; }

    public string Name { get; private set; } = string.Empty;

    public string Location { get; private set; } = string.Empty;

    public decimal AreaInHectares { get; private set; }

    public int OrganizationId { get; private set; }

    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    // Construtor vazio utilizado pelo Entity Framework
    private RuralProperty()
    {
    }

    // Construtor utilizado para criar uma propriedade rural
    public RuralProperty(
        string name,
        string location,
        decimal areaInHectares,
        int organizationId)
    {
        Name = name;
        Location = location;
        AreaInHectares = areaInHectares;
        OrganizationId = organizationId;
    }
}