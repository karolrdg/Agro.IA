using AgroIA.Api.Domain.Entities;

namespace AgroIA.Api.Services;

public interface IAIAnalysisService
{
    Task<AIAnalysis> AnalyzeAsync(
        int cropSeasonId,
        string prompt);

    Task<List<AIAnalysis>> GetAllAsync();
}