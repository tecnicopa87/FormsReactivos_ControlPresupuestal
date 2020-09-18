using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace reactiveForm.web.Migrations
{
    public partial class clasesEvento : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Eventos",
                columns: table => new
                {
                    IdEvento = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(nullable: true),
                    FechaInicio = table.Column<DateTime>(nullable: false),
                    Fechafin = table.Column<DateTime>(nullable: false),
                    Duracion = table.Column<TimeSpan>(nullable: false),
                    NoAsistentes = table.Column<int>(nullable: false),
                    ProductosPromocionar = table.Column<string>(nullable: true),
                    IdsMedicos = table.Column<string>(nullable: true),
                    Responsable = table.Column<string>(nullable: true),
                    PresupuestoAutorizado = table.Column<float>(nullable: false),
                    LugarEvento = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Eventos", x => x.IdEvento);
                });

            migrationBuilder.CreateTable(
                name: "productos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Descripcion = table.Column<string>(nullable: true),
                    costo = table.Column<float>(nullable: false),
                    Vigencia = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productos", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Eventos");

            migrationBuilder.DropTable(
                name: "productos");
        }
    }
}
