using Microsoft.EntityFrameworkCore.Migrations;

namespace Ordering.Migrations
{
    public partial class col : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Stock",
                table: "DbProduct",
                newName: "ProductId");

            migrationBuilder.AddColumn<int>(
                name: "Amount",
                table: "DbProduct",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "DbProduct");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "DbProduct",
                newName: "Stock");
        }
    }
}
