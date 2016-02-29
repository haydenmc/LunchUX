using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace LunchUX.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Application",
                columns: table => new
                {
                    ApplicationId = table.Column<Guid>(nullable: false),
                    AddressLineOne = table.Column<string>(nullable: true),
                    AddressLineTwo = table.Column<string>(nullable: true),
                    CaseNumber = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    DateSubmitted = table.Column<DateTimeOffset>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    IsInAssistancePrograms = table.Column<bool>(nullable: false),
                    IsSubmitted = table.Column<bool>(nullable: false),
                    LastFourSSN = table.Column<string>(nullable: true),
                    NoSSN = table.Column<bool>(nullable: false),
                    Phone = table.Column<string>(nullable: true),
                    State = table.Column<int>(nullable: false),
                    ZipCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Application", x => x.ApplicationId);
                });
            migrationBuilder.CreateTable(
                name: "Adult",
                columns: table => new
                {
                    AdultId = table.Column<Guid>(nullable: false),
                    AllOtherIncome = table.Column<double>(nullable: false),
                    AllOtherIncomeCadence = table.Column<int>(nullable: false),
                    ApplicationId = table.Column<Guid>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    PublicAssistance = table.Column<double>(nullable: false),
                    PublicAssistanceCadence = table.Column<int>(nullable: false),
                    WorkEarnings = table.Column<double>(nullable: false),
                    WorkEarningsCadence = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adult", x => x.AdultId);
                    table.ForeignKey(
                        name: "FK_Adult_Application_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Application",
                        principalColumn: "ApplicationId",
                        onDelete: ReferentialAction.Cascade);
                });
            migrationBuilder.CreateTable(
                name: "Child",
                columns: table => new
                {
                    ChildId = table.Column<Guid>(nullable: false),
                    ApplicationId = table.Column<Guid>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    Income = table.Column<double>(nullable: false),
                    IncomeCadence = table.Column<int>(nullable: false),
                    IsFosterChild = table.Column<bool>(nullable: false),
                    IsHomelessMigrantRunaway = table.Column<bool>(nullable: false),
                    IsStudent = table.Column<bool>(nullable: false),
                    LastName = table.Column<string>(nullable: true),
                    MiddleInitial = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Child", x => x.ChildId);
                    table.ForeignKey(
                        name: "FK_Child_Application_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Application",
                        principalColumn: "ApplicationId",
                        onDelete: ReferentialAction.Cascade);
                });
            migrationBuilder.CreateIndex(
                name: "IX_Application_Email",
                table: "Application",
                column: "Email",
                unique: true);
            migrationBuilder.CreateIndex(
                name: "IX_Application_Phone",
                table: "Application",
                column: "Phone",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable("Adult");
            migrationBuilder.DropTable("Child");
            migrationBuilder.DropTable("Application");
        }
    }
}
