using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        //ถ้าไม่ reference project ของ โมเดล หรือใส่ reference ผิด จะเออเร่อ asp.net No suitable constructor was found for entity type
        public DbSet<Activity> Activities { get; set; }


        /*สร้าง migrations
         * 1. เลือก Defualt Project ให้ตรงกับโปรเจคที่จะสร้าง migrations
         * 2. ใส่โค๊ด enable-migrations ที่ package manager console
         * 3. ใส่โค๊ด "add-migration MigrationName"  ที่ package manager console 
        */

    }
}
