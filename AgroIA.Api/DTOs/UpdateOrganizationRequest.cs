using System.ComponentModel.DataAnnotations;

namespace AgroIA.Api.DTOs;

public class UpdateOrganizationRequest
{
    [Required(ErrorMessage = "O nome da organização é obrigatório.")]
    [StringLength(
        100,
        MinimumLength = 3,
        ErrorMessage = "O nome deve ter entre 3 e 100 caracteres.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "O tipo da organização é obrigatório.")]
    [StringLength(
        50,
        ErrorMessage = "O tipo deve ter no máximo 50 caracteres.")]
    public string Type { get; set; } = string.Empty;
}