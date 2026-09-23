using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgroIA.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCropSeason : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CropSeasons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    RuralPropertyId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CropSeasons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CropSeasons_RuralProperties_RuralPropertyId",
                        column: x => x.RuralPropertyId,
                        principalTable: "RuralProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CropSeasons_RuralPropertyId",
                table: "CropSeasons",
                column: "RuralPropertyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CropSeasons");
        }
    }
}
