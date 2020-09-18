using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace reactiveForm.web.Migrations
{
    public partial class AddComentariosEvento : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Vigencia",
                table: "productos",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Comentarios",
                table: "Eventos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comentarios",
                table: "Eventos");

            migrationBuilder.AlterColumn<string>(
                name: "Vigencia",
                table: "productos",
                nullable: true,
                oldClrType: typeof(DateTime));
        }
    }
}
