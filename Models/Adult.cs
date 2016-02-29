using System;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace LunchUX.Models {
    public class Adult {
        public Adult() {
            FirstName = "";
            LastName = "";
            WorkEarnings = 0;
            WorkEarningsCadence = PayCadence.BiWeekly;
            PublicAssistance = 0;
            PublicAssistanceCadence = PayCadence.BiWeekly;
            AllOtherIncome = 0;
            AllOtherIncomeCadence = PayCadence.BiWeekly;
        }
        
        [JsonProperty("adultId")]
        public Guid AdultId { get; set; }
        
        [InverseProperty("Adults")]
        [ForeignKey("ApplicationId")]
        [JsonIgnore]
        public virtual Application Application { get; set; }
        
        [JsonProperty("applicationId")]
        public Guid ApplicationId { get; set; }
        
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        
        [JsonProperty("workEarnings")]
        public double WorkEarnings { get; set; }
        
        [JsonProperty("workEarningsCadence")]
        public PayCadence WorkEarningsCadence { get; set; }
        
        [JsonProperty("publicAssistance")]
        public double PublicAssistance { get; set; }
        
        [JsonProperty("publicAssistanceCadence")]
        public PayCadence PublicAssistanceCadence { get; set; }
        
        [JsonProperty("allOtherIncome")]
        public double AllOtherIncome { get; set; }
        
        [JsonProperty("allOtherIncomeCadence")]
        public PayCadence AllOtherIncomeCadence { get; set; }
    }
}