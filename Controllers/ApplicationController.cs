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
            var existing = _db.Applications
                .FirstOrDefault(a => a.Phone == app.Phone && a.Email == app.Email);
            if (existing != null) {
                return HttpBadRequest("An application already exists with this contact information.");
            }
            var newApp = new Application() {
                ApplicationId = Guid.NewGuid(),
                Phone = app.Phone,
                Email = app.Email
            };
            _db.Applications.Add(newApp);
            await _db.SaveChangesAsync();
            return new ObjectResult(newApp);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody]Application app)
        {
        }
    }
}
