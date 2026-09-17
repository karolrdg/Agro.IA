using AgroIA.Api.Data;
using AgroIA.Api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using AgroIA.Api.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AgroIADbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<OrganizationService>();
builder.Services.AddScoped<OrganizationRepository>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<UserService>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc(
        "v1",
        new OpenApiInfo
        {
            Title = "AgroIA API",
            Version = "v1"
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "healthy",
        service = "AgroIA.Api"
    });
});

app.Run();