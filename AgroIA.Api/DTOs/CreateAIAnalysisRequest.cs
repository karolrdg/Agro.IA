namespace AgroIA.Api.DTOs;

public class CreateAIAnalysisRequest
{
    public int CropSeasonId { get; set; }

    public string Prompt { get; set; } = string.Empty;
}