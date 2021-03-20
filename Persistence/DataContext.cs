using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

            modelBuilder.Entity<ActivityAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Activities)
                .HasForeignKey(aa => aa.AppUserId);

            modelBuilder.Entity<ActivityAttendee>()
               .HasOne(u => u.Activity)
               .WithMany(a => a.Attendees)
               .HasForeignKey(aa => aa.ActivityId);
        }

        //ถ้าไม่ reference project ของ โมเดล หรือใส่ reference ผิด จะเออเร่อ asp.net No suitable constructor was found for entity type
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }


        /*สร้าง migrations
         * 1. เลือก Defualt Project ให้ตรงกับโปรเจคที่จะสร้าง migrations
         * 2. ใส่โค๊ด enable-migrations ที่ package manager console
         * 3. ใส่โค๊ด "add-migration MigrationName"  ที่ package manager console 
        */

    }
}
