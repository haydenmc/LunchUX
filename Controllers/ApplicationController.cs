using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LunchUX.Models;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;

namespace LunchUX.Controllers
{
    [Route("api/[controller]")]
    public class ApplicationController : Controller
    {
        private ApplicationDbContext _db;
        
        public ApplicationController(ApplicationDbContext db) {
            _db = db;
        }
        
        // GET 
        [HttpGet("")]
        public IActionResult Get() {
            var apps = _db.Applications
                .Include(a => a.Adults)
                .Include(a => a.Children);
            return new ObjectResult(apps);
        }
        
        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var app = _db.Applications
                .Include(a => a.Adults)
                .Include(a => a.Children)
                .FirstOrDefault(a => a.ApplicationId == id);
            if (app != null) {
                return new ObjectResult(app);
            } else {
                return HttpNotFound();
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Application app)
        {
            app.ApplicationId = Guid.NewGuid();
            app.DateSubmitted = DateTimeOffset.Now;
            app.IsSubmitted = true;
            foreach (var c in app.Children) {
                c.ChildId = Guid.NewGuid();
                _db.Children.Add(c);
            }
            foreach (var a in app.Adults) {
                a.AdultId = Guid.NewGuid();
                _db.Adults.Add(a);
            }
            _db.Applications.Add(app);
            await _db.SaveChangesAsync();
            return new ObjectResult(app);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody]Application app)
        {
        }
    }
}
