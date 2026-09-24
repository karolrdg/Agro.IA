using AgroIA.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AgroIA.Api.DTOs;
namespace AgroIA.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AIAnalysesController : ControllerBase
{
    private readonly IAIAnalysisService _aiAnalysisService;

    public AIAnalysesController(
        IAIAnalysisService aiAnalysisService)
    {
        _aiAnalysisService = aiAnalysisService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAnalysis(
        [FromBody] CreateAIAnalysisRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Prompt))
        {
            return BadRequest(new
            {
                message = "O prompt da análise é obrigatório."
            });
        }

        try
        {
            var analysis = await _aiAnalysisService.AnalyzeAsync(
                request.CropSeasonId,
                request.Prompt);

            return CreatedAtAction(
                nameof(CreateAnalysis),
                new { id = analysis.Id },
                analysis);
        }
        catch (InvalidOperationException exception)
        {
            return NotFound(new
            {
                message = exception.Message
            });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var analyses = await _aiAnalysisService.GetAllAsync();

        return Ok(analyses);
    }
}

