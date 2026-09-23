using AgroIA.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgroIA.Api.Data.Config;

public class CropSeasonConfiguration
    : IEntityTypeConfiguration<CropSeason>
{
    public void Configure(
        EntityTypeBuilder<CropSeason> builder)
    {
        // Define a tabela no banco de dados
        builder.ToTable("CropSeasons");

        // Define a chave primária
        builder.HasKey(cropSeason => cropSeason.Id);

        // Configura o nome da safra
        builder.Property(cropSeason => cropSeason.Name)
            .IsRequired()
            .HasMaxLength(150);

        // Configura o ano da safra
        builder.Property(cropSeason => cropSeason.Year)
            .IsRequired();

       
        builder.HasOne<RuralProperty>() // uma safra pertence a uma propriedade rural
            .WithMany()
            .HasForeignKey(cropSeason => cropSeason.RuralPropertyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}