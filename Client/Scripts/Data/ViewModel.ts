class ViewModel {
    public languageResources: IObservable<LanguageResourceManager>;
    public application: IObservable<ApplicationModel>;
    
    constructor() {
        this.languageResources = new Observable<LanguageResourceManager>(new LanguageResourceManager());
        JsonRequest.httpGet("/Languages/english.json").then((val) => {
            this.languageResources.value = AutoMapper.map(val, LanguageResourceManager);
        }, () => {
            console.error("Failed to load english language resources.");
        });
        this.application = new Observable<ApplicationModel>(new ApplicationModel());
    }
    
    public createApplication(): void {
        var appJson = {
            email: this.application.value.email.value,
            phone: this.application.value.phone.value
        };
        JsonRequest.httpPost("/api/application", JSON.stringify(appJson), null, "application/json").then((result) => {
            this.application.value.applicationId = (<any>result).applicationId;
        }, (error) => {
            alert("Error starting new application.");
        });
    }
    
    public submitApplication(): void {
        var appJson = {
            isInAssistancePrograms: this.application.value.isInAssistancePrograms.value,
            caseNumber: this.application.value.caseNumber.value,
            addressLineOne: this.application.value.addressLineOne.value,
            city: this.application.value.city.value,
            state: this.application.value.state.value,
            zipCode: this.application.value.zipCode.value,
            email: this.application.value.email.value,
            phone: this.application.value.phone.value,
            lastFourSSN: this.application.value.lastFourSSN.value,
            noSSN: this.application.value.noSSN.value,
            children: [],
            adults: []
        };
        for (var i = 0; i < this.application.value.children.value.size; i++) {
            ((i) => {
                var c = this.application.value.children.value.get(i);
                appJson.children.push({
                    firstName: c.firstName.value,
                    middleInitial: c.middleInitial.value,
                    lastName: c.lastName.value,
                    isStudent: c.isStudent.value,
                    isFosterChild: c.isFosterChild.value,
                    isHomelessMigrantRunaway: c.isHomelessMigrantRunaway.value,
                    income: c.income.value,
                    incomeCadence: c.incomeCadence.value
                });
            })(i);
        }
        for (var i = 0; i < this.application.value.adults.value.size; i++) {
            ((i) => {
                var c = this.application.value.adults.value.get(i);
                appJson.adults.push({
                    firstName: c.firstName.value,
                    lastName: c.lastName.value,
                    workEarnings: c.workEarnings.value,
                    workEarningsCadence: c.workEarningsCadence.value,
                    publicAssistance: c.publicAssistance.value,
                    publicAssistanceCadence: c.publicAssistanceCadence.value,
                    allOtherIncome: c.allOtherIncome.value,
                    allOtherIncomeCadence: c.allOtherIncomeCadence.value
                });
            })(i);
        }
        console.log(appJson);
        JsonRequest.httpPost("/api/application", JSON.stringify(appJson), null, "application/json").then((result) => {
            
        }, (error) => {
            alert("Error starting new application.");
        });
    }
}