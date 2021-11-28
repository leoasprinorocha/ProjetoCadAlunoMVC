using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjetoCadAlunoAPI.Migrations
{
    public partial class addcpf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CpfAluno",
                table: "Aluno",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CpfAluno",
                table: "Aluno");
        }
    }
}
