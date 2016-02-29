using Microsoft.Data.Entity;
namespace LunchUX.Models {
    public class ApplicationDbContext: DbContext {
        public DbSet<Application> Applications { get; set; }
        public DbSet<Adult> Adults { get; set; }
        public DbSet<Child> Children { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Max length
            modelBuilder
                .Entity<Application>()
                .Property(a => a.Phone)
                .HasMaxLength(14);
                
            modelBuilder
                .Entity<Application>()
                .Property(a => a.Email)
                .HasMaxLength(254);
                
            modelBuilder
                .Entity<Child>()
                .Property(c => c.MiddleInitial)
                .HasMaxLength(1);
                
            // Add indexes for looking up applications
            modelBuilder
                .Entity<Application>()
                .HasIndex(a => a.Email)
                .IsUnique(true);

            modelBuilder
                .Entity<Application>()
                .HasIndex(a => a.Phone)
                .IsUnique(true);
        }
    }
}