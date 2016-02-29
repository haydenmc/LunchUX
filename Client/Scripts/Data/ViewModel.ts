class ViewModel {
    public languageResources: IObservable<ILanguageResources>;
    
    constructor() {
        this.languageResources = new Observable<ILanguageResources>({
            englishLanguageNameBlurb: new Observable<string>("I prefer to complete the application in English"),
            spanishLanguageNameBlurb: new Observable<string>("Prefiero llenar la solicitud en español"),
            chineseLanguageNameBlurb: new Observable<string>("我更愿意完成在西班牙语中的应用"),
            frenchLanguageNameBlurb: new Observable<string>("Je préfère remplir la demande en espagnol"),
            vietnameseLanguageNameBlurb: new Observable<string>("Tôi muốn hoàn thành ứng dụng tiếng Tây Ban Nha"),
            tagalogLanguageNameBlurb: new Observable<string>("I prefer to complete the application in English"),
            arabicLanguageNameBlurb: new Observable<string>("أنا أفضل لاستكمال الطلب بالإسبانية"),
            koreanLanguageNameBlurb: new Observable<string>("난 스페인어에서 응용 프로그램 작성을 선호 합니다"),
            introHeader: new Observable<string>("National School Lunch Program"),
            introBlurb: new Observable<string>("The National School Lunch Program is a federally assisted meal program operating in public and nonprofit private schools and residential child care institutions. It provides nutritionally balanced, low-cost or free lunches to children each school day."),
            introBeginButtonText: new Observable<string>("Begin"),
            languageHeader: new Observable<string>("Language")
        });
    }
}