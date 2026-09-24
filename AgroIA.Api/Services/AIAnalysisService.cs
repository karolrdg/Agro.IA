using AgroIA.Api.Data;
using AgroIA.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgroIA.Api.Services;

public class AIAnalysisService : IAIAnalysisService
{
    private readonly AgroIADbContext _context;

    public AIAnalysisService(AgroIADbContext context)
    {
        _context = context;
    }

    public async Task<AIAnalysis> AnalyzeAsync(
        int cropSeasonId,
        string prompt)
    {
        // Verifica se a safra existe
        var cropSeason = await _context.CropSeasons
            .FirstOrDefaultAsync(
                season => season.Id == cropSeasonId);

        if (cropSeason is null)
        {
            throw new InvalidOperationException(
                "Safra não encontrada.");
        }

        // Resposta simulada mock
        var normalizedPrompt = prompt.ToLowerInvariant();

        string result;

        if (normalizedPrompt.Contains("praga") ||
            normalizedPrompt.Contains("doença"))
        {
            result =
                $"Análise agrícola da safra '{cropSeason.Name}':\n\n" +
                "Recomendações simuladas:\n" +
                "- Monitorar regularmente a presença de pragas.\n" +
                "- Registrar sintomas e ocorrências na propriedade.\n" +
                "- Avaliar as condições da cultura com um profissional agrícola.\n" +
                "- Evitar aplicações sem orientação técnica.";
        }
        else if (normalizedPrompt.Contains("chuva") ||
                 normalizedPrompt.Contains("clima") ||
                 normalizedPrompt.Contains("tempo"))
        {
            result =
                $"Análise climática simulada da safra " +
                $"'{cropSeason.Name}':\n\n" +
                "Recomendações simuladas:\n" +
                "- Acompanhar as previsões meteorológicas.\n" +
                "- Observar a umidade do solo.\n" +
                "- Registrar eventos climáticos relevantes.\n" +
                "- Avaliar a necessidade de manejo conforme as condições locais.";
        }
        else if (normalizedPrompt.Contains("milho") ||
                 normalizedPrompt.Contains("soja") ||
                 normalizedPrompt.Contains("plantio"))
        {
            result =
                $"Análise de manejo simulada da safra " +
                $"'{cropSeason.Name}':\n\n" +
                "Recomendações simuladas:\n" +
                "- Acompanhar o desenvolvimento da cultura.\n" +
                "- Registrar as etapas do plantio.\n" +
                "- Monitorar indicadores de crescimento.\n" +
                "- Comparar os resultados com o planejamento agrícola.";
        }
        else
        {
            result =
                $"Análise simulada para a safra " +
                $"'{cropSeason.Name}':\n\n" +
                $"Solicitação recebida: {prompt}\n\n" +
                "Recomendações gerais:\n" +
                "- Acompanhar os indicadores da propriedade.\n" +
                "- Registrar as ocorrências agrícolas.\n" +
                "- Manter o histórico da safra atualizado.\n" +
                "- Buscar orientação técnica para decisões específicas.";
        }

        // Cria o registro da análise
        var analysis = new AIAnalysis(
            cropSeasonId,
            prompt,
            result,
            "Mock");

        _context.AIAnalyses.Add(analysis);

        await _context.SaveChangesAsync();

        return analysis;
    }

    public async Task<List<AIAnalysis>> GetAllAsync()
    {
        return await _context.AIAnalyses
            .Include(analysis => analysis.CropSeason)
            .AsNoTracking()
            .OrderByDescending(analysis => analysis.CreatedAt)
            .ToListAsync();
    }
}