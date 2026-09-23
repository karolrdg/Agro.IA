namespace AgroIA.Api.DTOs.CropSeasons;

public class CreateCropSeasonRequest
{
    public string Name { get; set; } = string.Empty;

    public int Year { get; set; }

    public int RuralPropertyId { get; set; }
}