using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjetoCadAlunoAPI.Migrations
{
    public partial class Third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataRegistroAluno",
                table: "Aluno",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataUltimaAtualizacao",
                table: "Aluno",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataRegistroAluno",
                table: "Aluno");

            migrationBuilder.DropColumn(
                name: "DataUltimaAtualizacao",
                table: "Aluno");
        }
    }
}
