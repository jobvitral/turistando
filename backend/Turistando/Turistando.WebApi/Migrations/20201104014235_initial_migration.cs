using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Turistando.WebApi.Migrations
{
    public partial class initial_migration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categoria",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categoria", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Tipo = table.Column<int>(nullable: false),
                    Nome = table.Column<string>(maxLength: 250, nullable: false),
                    Avatar = table.Column<string>(maxLength: 250, nullable: false),
                    DataNascimento = table.Column<DateTime>(nullable: false),
                    Sexo = table.Column<string>(maxLength: 2, nullable: false),
                    Cidade = table.Column<string>(maxLength: 250, nullable: true),
                    Estado = table.Column<string>(maxLength: 50, nullable: true),
                    Telefone = table.Column<string>(maxLength: 50, nullable: false),
                    Email = table.Column<string>(maxLength: 250, nullable: false),
                    Senha = table.Column<string>(maxLength: 250, nullable: false),
                    GuiaCarro = table.Column<string>(maxLength: 250, nullable: true),
                    GuiaPlaca = table.Column<string>(maxLength: 250, nullable: true),
                    GuiaHorario = table.Column<string>(type: "text", nullable: true),
                    GuiaDetalhe = table.Column<string>(type: "text", nullable: true),
                    GuiaAvaliacao = table.Column<double>(type: "double(15,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reserva",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IdTurista = table.Column<int>(nullable: false),
                    IdGuia = table.Column<int>(nullable: false),
                    DataCriacao = table.Column<DateTime>(nullable: false),
                    DataReserva = table.Column<DateTime>(nullable: false),
                    Horario = table.Column<string>(maxLength: 250, nullable: true),
                    Local = table.Column<string>(maxLength: 250, nullable: true),
                    ValorTotal = table.Column<double>(type: "double(15,2)", nullable: false),
                    Avaliacao = table.Column<double>(type: "double(15,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reserva", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reserva_Usuario_IdGuia",
                        column: x => x.IdGuia,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reserva_Usuario_IdTurista",
                        column: x => x.IdTurista,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Roteiro",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IdGuia = table.Column<int>(nullable: false),
                    Cidade = table.Column<string>(maxLength: 250, nullable: true),
                    Estado = table.Column<string>(maxLength: 50, nullable: true),
                    Descricao = table.Column<string>(type: "text", nullable: true),
                    Valor = table.Column<double>(type: "double(15,2)", nullable: false),
                    Tempo = table.Column<double>(maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roteiro", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Roteiro_Usuario_IdGuia",
                        column: x => x.IdGuia,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReservaRoteiro",
                columns: table => new
                {
                    IdReserva = table.Column<int>(nullable: false),
                    IdRoteiro = table.Column<int>(nullable: false),
                    Informacoes = table.Column<string>(maxLength: 250, nullable: true),
                    Valor = table.Column<double>(type: "double(15,2)", nullable: false),
                    Avaliacao = table.Column<double>(type: "double(15,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservaRoteiro", x => new { x.IdReserva, x.IdRoteiro });
                    table.ForeignKey(
                        name: "FK_ReservaRoteiro_Reserva_IdReserva",
                        column: x => x.IdReserva,
                        principalTable: "Reserva",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservaRoteiro_Roteiro_IdRoteiro",
                        column: x => x.IdRoteiro,
                        principalTable: "Roteiro",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RoteiroCategoria",
                columns: table => new
                {
                    IdRoteiro = table.Column<int>(nullable: false),
                    IdCategoria = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoteiroCategoria", x => new { x.IdRoteiro, x.IdCategoria });
                    table.ForeignKey(
                        name: "FK_RoteiroCategoria_Categoria_IdCategoria",
                        column: x => x.IdCategoria,
                        principalTable: "Categoria",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoteiroCategoria_Roteiro_IdRoteiro",
                        column: x => x.IdRoteiro,
                        principalTable: "Roteiro",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reserva_IdGuia",
                table: "Reserva",
                column: "IdGuia");

            migrationBuilder.CreateIndex(
                name: "IX_Reserva_IdTurista",
                table: "Reserva",
                column: "IdTurista");

            migrationBuilder.CreateIndex(
                name: "IX_ReservaRoteiro_IdRoteiro",
                table: "ReservaRoteiro",
                column: "IdRoteiro");

            migrationBuilder.CreateIndex(
                name: "IX_Roteiro_IdGuia",
                table: "Roteiro",
                column: "IdGuia");

            migrationBuilder.CreateIndex(
                name: "IX_RoteiroCategoria_IdCategoria",
                table: "RoteiroCategoria",
                column: "IdCategoria");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservaRoteiro");

            migrationBuilder.DropTable(
                name: "RoteiroCategoria");

            migrationBuilder.DropTable(
                name: "Reserva");

            migrationBuilder.DropTable(
                name: "Categoria");

            migrationBuilder.DropTable(
                name: "Roteiro");

            migrationBuilder.DropTable(
                name: "Usuario");
        }
    }
}
