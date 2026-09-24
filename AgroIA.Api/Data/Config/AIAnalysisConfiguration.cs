using AgroIA.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgroIA.Api.Data.Config;

public class AIAnalysisConfiguration
    : IEntityTypeConfiguration<AIAnalysis>
{
    public void Configure(
        EntityTypeBuilder<AIAnalysis> builder)
    {
        builder.ToTable("AIAnalyses");

        builder.HasKey(analysis => analysis.Id);

        builder.Property(analysis => analysis.Prompt)
            .IsRequired()
            .HasMaxLength(4000);

        builder.Property(analysis => analysis.Result)
            .IsRequired()
            .HasMaxLength(20000);

        builder.Property(analysis => analysis.Provider)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(analysis => analysis.CreatedAt)
            .IsRequired();

        builder.HasOne(analysis => analysis.CropSeason)
            .WithMany()
            .HasForeignKey(analysis => analysis.CropSeasonId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}