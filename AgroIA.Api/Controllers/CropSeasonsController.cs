using AgroIA.Api.Data;
using AgroIA.Api.Domain.Entities;
using AgroIA.Api.DTOs.CropSeasons;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgroIA.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CropSeasonsController : ControllerBase
{
    private readonly AgroIADbContext _context;

    public CropSeasonsController(AgroIADbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CreateCropSeasonRequest request)
    {
        var ruralPropertyExists =
            await _context.RuralProperties
                .AnyAsync(property =>
                    property.Id == request.RuralPropertyId);

        if (!ruralPropertyExists)
        {
            return BadRequest(new
            {
                message = "A propriedade rural informada não existe."
            });
        }

        // Valida o nome da safra
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new
            {
                message = "O nome da safra é obrigatório."
            });
        }

        // Valida o ano
        if (request.Year < 2000 || request.Year > 2100)
        {
            return BadRequest(new
            {
                message = "Informe um ano válido para a safra."
            });
        }

        // Cria a entidade
        var cropSeason = new CropSeason(
            request.Name,
            request.Year,
            request.RuralPropertyId);

        _context.CropSeasons.Add(cropSeason);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetById),
            new { id = cropSeason.Id },
            cropSeason);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var cropSeason = await _context.CropSeasons
            .AsNoTracking()
            .FirstOrDefaultAsync(season =>
                season.Id == id);

        if (cropSeason is null)
        {
            return NotFound(new
            {
                message = "Safra não encontrada."
            });
        }

        return Ok(cropSeason);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var cropSeasons = await _context.CropSeasons
            .AsNoTracking()
            .ToListAsync();

        return Ok(cropSeasons);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        // Procura a safra pelo ID
        var cropSeason = await _context.CropSeasons
            .FirstOrDefaultAsync(season => season.Id == id);

        // Verifica se a safra existe
        if (cropSeason is null)
        {
            return NotFound(new
            {
                message = "Safra não encontrada."
            });
        }

        _context.CropSeasons.Remove(cropSeason);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}