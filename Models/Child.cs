using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace LunchUX.Models {
    public class Child {
        public Child() {
            FirstName = "";
            MiddleInitial = "";
            LastName = "";
            IsStudent = false;
            IsFosterChild = false;
            IsHomelessMigrantRunaway = false;
            Income = 0;
            IncomeCadence = PayCadence.BiWeekly;
        }
        
        [JsonProperty("childId")]
        public Guid ChildId { get; set; }
        
        [InverseProperty("Children")]
        [ForeignKey("ApplicationId")]
        [JsonIgnore]
        public virtual Application Application { get; set; }
        
        [JsonProperty("applicationId")]
        public Guid ApplicationId { get; set; }
        
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        
        [JsonProperty("middleInitial")]
        [MaxLength(1)]
        public string MiddleInitial { get; set; }
        
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        
        [JsonProperty("isStudent")]
        public bool IsStudent { get; set; }
        
        [JsonProperty("isFosterChild")]
        public bool IsFosterChild { get; set; }
        
        [JsonProperty("isHomelessMigrantRunaway")]
        public bool IsHomelessMigrantRunaway { get; set; }
        
        [JsonProperty("income")]
        public double Income { get; set; }
        
        [JsonProperty("incomeCadence")]
        public PayCadence IncomeCadence { get; set; }
    }
}