using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace LunchUX.Models {
    public class Application {
        public Application() {
            IsInAssistancePrograms = false;
            CaseNumber = "";
            AddressLineOne = "";
            AddressLineTwo = "";
            City = "";
            State = 0;
            ZipCode = "";
            Email = "";
            Phone = "";
            DateSubmitted = DateTimeOffset.MinValue;
            IsSubmitted = false;
            Children = new List<Child>();
            Adults = new List<Adult>();
            LastFourSSN = "";
            NoSSN = false;
        }
        
        [JsonProperty("applicationId")]
        public Guid ApplicationId { get; set; }
        
        [JsonProperty("isInAssistancePrograms")]
        public bool IsInAssistancePrograms { get; set; }
        
        [JsonProperty("caseNumber")]
        public string CaseNumber { get; set; }
        
        [JsonProperty("addressLineOne")]
        public string AddressLineOne { get; set; }
        
        [JsonProperty("addressLineTwo")]
        public string AddressLineTwo { get; set; }
        
        [JsonProperty("city")]
        public string City { get; set; }
        
        [JsonProperty("state")]
        [Range(0, 50)]
        public State State { get; set; }
        
        [JsonProperty("zipCode")]
        [MaxLength(5)]
        public string ZipCode { get; set; }
        
        [JsonProperty("email")]
        [MaxLength(254)]
        public string Email { get; set; }
        
        [JsonProperty("phone")]
        [MaxLength(14)]
        public string Phone { get; set; }
        
        [JsonProperty("dateSubmitted")]
        public DateTimeOffset DateSubmitted { get; set; }
        
        [JsonProperty("isSubmitted")]
        public bool IsSubmitted { get; set; }
        
        [JsonProperty("children")]
        public virtual ICollection<Child> Children { get; set; }
        
        [JsonProperty("adults")]
        public virtual ICollection<Adult> Adults { get; set; }
        
        [JsonProperty("lastFourSSN")]
        [MaxLength(4)]
        public string LastFourSSN { get; set; }
        
        [JsonProperty("noSSN")]
        public bool NoSSN { get; set; }
    }
}