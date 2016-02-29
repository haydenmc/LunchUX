using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using LunchUX.Models;

namespace LunchUX.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("LunchUX.Models.Adult", b =>
                {
                    b.Property<Guid>("AdultId")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("AllOtherIncome");

                    b.Property<int>("AllOtherIncomeCadence");

                    b.Property<Guid>("ApplicationId");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<double>("PublicAssistance");

                    b.Property<int>("PublicAssistanceCadence");

                    b.Property<double>("WorkEarnings");

                    b.Property<int>("WorkEarningsCadence");

                    b.HasKey("AdultId");
                });

            modelBuilder.Entity("LunchUX.Models.Application", b =>
                {
                    b.Property<Guid>("ApplicationId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AddressLineOne");

                    b.Property<string>("AddressLineTwo");

                    b.Property<string>("CaseNumber");

                    b.Property<string>("City");

                    b.Property<DateTimeOffset>("DateSubmitted");

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 254);

                    b.Property<bool>("IsInAssistancePrograms");

                    b.Property<bool>("IsSubmitted");

                    b.Property<string>("LastFourSSN")
                        .HasAnnotation("MaxLength", 4);

                    b.Property<bool>("NoSSN");

                    b.Property<string>("Phone")
                        .HasAnnotation("MaxLength", 14);

                    b.Property<int>("State");

                    b.Property<string>("ZipCode")
                        .HasAnnotation("MaxLength", 5);

                    b.HasKey("ApplicationId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Phone")
                        .IsUnique();
                });

            modelBuilder.Entity("LunchUX.Models.Child", b =>
                {
                    b.Property<Guid>("ChildId")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("ApplicationId");

                    b.Property<string>("FirstName");

                    b.Property<double>("Income");

                    b.Property<int>("IncomeCadence");

                    b.Property<bool>("IsFosterChild");

                    b.Property<bool>("IsHomelessMigrantRunaway");

                    b.Property<bool>("IsStudent");

                    b.Property<string>("LastName");

                    b.Property<string>("MiddleInitial")
                        .HasAnnotation("MaxLength", 1);

                    b.HasKey("ChildId");
                });

            modelBuilder.Entity("LunchUX.Models.Adult", b =>
                {
                    b.HasOne("LunchUX.Models.Application")
                        .WithMany()
                        .HasForeignKey("ApplicationId");
                });

            modelBuilder.Entity("LunchUX.Models.Child", b =>
                {
                    b.HasOne("LunchUX.Models.Application")
                        .WithMany()
                        .HasForeignKey("ApplicationId");
                });
        }
    }
}
