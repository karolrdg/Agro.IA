using AgroIA.Api.Data;
using AgroIA.Api.Domain.Entities;
using AgroIA.Api.DTOs.RuralProperties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgroIA.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RuralPropertiesController : ControllerBase
{
    private readonly AgroIADbContext _context;

    public RuralPropertiesController(AgroIADbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateRuralPropertyRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new
            {
                message = "O nome da propriedade é obrigatório."
            });
        }

        if (string.IsNullOrWhiteSpace(request.Location))
        {
            return BadRequest(new
            {
                message = "A localização da propriedade é obrigatória."
            });
        }

        if (request.AreaInHectares <= 0)
        {
            return BadRequest(new
            {
                message = "A área da propriedade deve ser maior que zero."
            });
        }

        if (request.OrganizationId <= 0)
        {
            return BadRequest(new
            {
                message = "Uma organização válida deve ser informada."
            });
        }

        var organizationExists = await _context.Organizations
            .AnyAsync(organization => organization.Id == request.OrganizationId);

        if (!organizationExists)
        {
            return BadRequest(new
            {
                message = "A organização informada não existe."
            });
        }

        var ruralProperty = new RuralProperty(
            request.Name,
            request.Location,
            request.AreaInHectares,
            request.OrganizationId);

        _context.RuralProperties.Add(ruralProperty);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetById),
            new { id = ruralProperty.Id },
            ruralProperty);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var ruralProperty = await _context.RuralProperties
            .AsNoTracking()
            .FirstOrDefaultAsync(property => property.Id == id);

        // Se não encontrar, retorna 404
        if (ruralProperty is null)
        {
            return NotFound(new
            {
                message = "Propriedade rural não encontrada."
            });
        }
        return Ok(ruralProperty);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var ruralProperties = await _context.RuralProperties
            .AsNoTracking()
            .ToListAsync();

        // 200 OK
        return Ok(ruralProperties);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var property = await _context.RuralProperties
            .FirstOrDefaultAsync(property => property.Id == id);

        // Verifica se a propriedade existe
        if (property is null)
        {
            return NotFound(new
            {
                message = "Propriedade rural não encontrada."
            });
        }

        // Verifica se existem safras vinculadas à propriedade
        var hasCropSeasons = await _context.CropSeasons
            .AnyAsync(cropSeason =>
                cropSeason.RuralPropertyId == id);

        if (hasCropSeasons)
        {
            return Conflict(new
            {
                message = "Não é possível excluir esta propriedade porque existem safras vinculadas a ela. Exclua as safras primeiro."
            });
        }

        try
        {
            // Exclui a propriedade quando não existem safras vinculadas
            _context.RuralProperties.Remove(property);

            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (DbUpdateException)
        {
            return Conflict(new
            {
                message = "Não é possível excluir esta propriedade porque existem outros dados vinculados a ela."
            });
        }
    }

}