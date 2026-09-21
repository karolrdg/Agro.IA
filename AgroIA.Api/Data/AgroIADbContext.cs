using AgroIA.Api.Models;
using Microsoft.EntityFrameworkCore;
using AgroIA.Api.Domain.Entities;
namespace AgroIA.Api.Data;

using AgroIA.Api.Data.Config;

public class AgroIADbContext : DbContext
{
    public AgroIADbContext(
        DbContextOptions<AgroIADbContext> options)
        : base(options)
    {
    }

    public DbSet<Organization> Organizations { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<RuralProperty> RuralProperties { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new RuralPropertyConfiguration());
    }
}

