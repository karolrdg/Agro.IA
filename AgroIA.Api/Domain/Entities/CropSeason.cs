namespace AgroIA.Api.Domain.Entities;

public class CropSeason
{
    public int Id { get; private set; }

    public string Name { get; private set; } = string.Empty;

    public int Year { get; private set; }

    public int RuralPropertyId { get; private set; }

    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    private CropSeason()
    {
    }

    public CropSeason(
        string name,
        int year,
        int ruralPropertyId)
    {
        Name = name;
        Year = year;
        RuralPropertyId = ruralPropertyId;
    }
}