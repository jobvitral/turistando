using Microsoft.EntityFrameworkCore.Migrations;

namespace Turistando.WebApi.Migrations
{
    public partial class upload_controller_roteiro_update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Imagem",
                table: "Roteiro",
                maxLength: 250,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nome",
                table: "Roteiro",
                maxLength: 250,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Imagem",
                table: "Roteiro");

            migrationBuilder.DropColumn(
                name: "Nome",
                table: "Roteiro");
        }
    }
}
