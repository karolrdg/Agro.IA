using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroIA.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddAIAnalysis : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AIAnalyses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CropSeasonId = table.Column<int>(type: "int", nullable: false),
                    Prompt = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    Result = table.Column<string>(type: "nvarchar(max)", maxLength: 20000, nullable: false),
                    Provider = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AIAnalyses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AIAnalyses_CropSeasons_CropSeasonId",
                        column: x => x.CropSeasonId,
                        principalTable: "CropSeasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AIAnalyses_CropSeasonId",
                table: "AIAnalyses",
                column: "CropSeasonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AIAnalyses");
        }
    }
}
