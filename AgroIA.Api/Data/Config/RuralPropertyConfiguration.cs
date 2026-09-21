using AgroIA.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgroIA.Api.Data.Config;

public class RuralPropertyConfiguration : IEntityTypeConfiguration<RuralProperty>
{
    public void Configure(EntityTypeBuilder<RuralProperty> builder)
    {
        // Define o nome da tabela no banco de dados
        builder.ToTable("RuralProperties");

        // Define a chave primária
        builder.HasKey(property => property.Id);

        // Configura o nome da propriedade
        builder.Property(property => property.Name)
            .IsRequired()
            .HasMaxLength(150);

        // Configura a localização
        builder.Property(property => property.Location)
            .IsRequired()
            .HasMaxLength(250);

        // Configura a área em hectares
        builder.Property(property => property.AreaInHectares)
            .HasColumnType("decimal(18,2)");

        // Configura o identificador da organização
        builder.Property(property => property.OrganizationId)
            .IsRequired();

        // Configura a data de criação
        builder.Property(property => property.CreatedAt)
            .IsRequired();
    }
}