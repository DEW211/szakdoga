using Microsoft.EntityFrameworkCore.Migrations;

namespace Ordering.Migrations
{
    public partial class id : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BasketId",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BasketId",
                table: "Orders");
        }
    }
}
