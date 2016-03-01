class LanguageResourceManager {
    /* Common */
    public buttonNext: IObservable<string> = new Observable<string>("");
    /* Introduction page */
    public introHeader: IObservable<string> = new Observable<string>("");
    public introBlurb: IObservable<string> = new Observable<string>("");
    public introBeginButtonText: IObservable<string> = new Observable<string>("");
    public languageHeader: IObservable<string> = new Observable<string>("");
    public englishLanguageNameBlurb: IObservable<string> = new Observable<string>("");
    public spanishLanguageNameBlurb: IObservable<string> = new Observable<string>("");
    public chineseLanguageNameBlurb: IObservable<string> = new Observable<string>("");
    public frenchLanguageNameBlurb: IObservable<string> = new Observable<string>("");
    public vietnameseLanguageNameBlurb: IObservable<string> = new Observable<string>("");
    public tagalogLanguageNameBlurb: IObservable<string> = new Observable<string>("");
    public arabicLanguageNameBlurb: IObservable<string> = new Observable<string>("");
    public koreanLanguageNameBlurb: IObservable<string> = new Observable<string>("");
    /* Account info page */
    public accountInfoHeader: IObservable<string> = new Observable<string>("");
    public accountInfoBlurb: IObservable<string> = new Observable<string>("");
    public accountInfoFormHeader: IObservable<string> = new Observable<string>("");
    public accountInfoPlaceholderFirstName: IObservable<string> = new Observable<string>("");
    public accountInfoPlaceholderLastName: IObservable<string> = new Observable<string>("");
    public accountInfoPlaceholderEmail: IObservable<string> = new Observable<string>("");
    public accountInfoPlaceholderPhone: IObservable<string> = new Observable<string>("");
    public accountInfoPlaceholderPassword: IObservable<string> = new Observable<string>("");
    /* Household role page */
    public householdRoleHeader: IObservable<string> = new Observable<string>("");
    public householdRoleBlurb: IObservable<string> = new Observable<string>("");
    public householdRoleFormHeader: IObservable<string> = new Observable<string>("");
    public householdRoleChild: IObservable<string> = new Observable<string>("");
    public householdRoleAdult: IObservable<string> = new Observable<string>("");
    /* Case number page */
    public caseNumberHeader: IObservable<string> = new Observable<string>("");
    public caseNumberBlurb: IObservable<string> = new Observable<string>("");
    public caseNumberFormHeader: IObservable<string> = new Observable<string>("");
    public caseNumberButtonNoCaseNumber: IObservable<string> = new Observable<string>("");
}