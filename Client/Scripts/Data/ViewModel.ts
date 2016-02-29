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
}