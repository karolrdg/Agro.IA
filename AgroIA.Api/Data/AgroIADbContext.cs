using AgroIA.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AgroIA.Api.Data;

public class AgroIADbContext : DbContext
{
    public AgroIADbContext(
        DbContextOptions<AgroIADbContext> options)
        : base(options)
    {
    }

    public DbSet<Organization> Organizations { get; set; }
}