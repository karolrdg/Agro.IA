namespace AgroIA.Api.Domain.Entities;

public class AIAnalysis
{
    public int Id { get; private set; }

    public int CropSeasonId { get; private set; }

    public string Prompt { get; private set; } = string.Empty;

    public string Result { get; private set; } = string.Empty;

    public string Provider { get; private set; } = string.Empty;

    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public CropSeason CropSeason { get; private set; } = null!;

    private AIAnalysis()
    {
    }

    public AIAnalysis(
        int cropSeasonId,
        string prompt,
        string result,
        string provider)
    {
        CropSeasonId = cropSeasonId;
        Prompt = prompt;
        Result = result;
        Provider = provider;
    }
}