class LanguageResourceManager {
    /* Common */
    public buttonNext: IObservable<string> = new Observable<string>("");
    public buttonAdd: IObservable<string> = new Observable<string>("");
    public buttonCancel: IObservable<string> = new Observable<string>("");
    public yes: IObservable<string> = new Observable<string>("");
    public no: IObservable<string> = new Observable<string>("");
    public firstName: IObservable<string> = new Observable<string>("");
    public lastName: IObservable<string> = new Observable<string>("");
    public middleInitialAbbrev: IObservable<string> = new Observable<string>("");
    public monthlyIncome: IObservable<string> = new Observable<string>(""); 
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
    /* Children page */
    public childrenHeader: IObservable<string> = new Observable<string>("");
    public childrenBlurb: IObservable<string> = new Observable<string>("");
    public childrenFormHeader: IObservable<string> = new Observable<string>("");
    /* Add child dialog */
    public addChildFormHeader: IObservable<string> = new Observable<string>("");
    public addChildIsStudent: IObservable<string> = new Observable<string>("");
    public addChildIsFoster: IObservable<string> = new Observable<string>("");
    public addChildIsHomelessMigrantRunaway: IObservable<string> = new Observable<string>("");
    /* Adults page */
    public adultsHeader: IObservable<string> = new Observable<string>("");
    public adultsBlurb: IObservable<string> = new Observable<string>("");
    public adultsFormHeader: IObservable<string> = new Observable<string>("");
    /* Add adult dialog */
    public addAdultFormHeader: IObservable<string> = new Observable<string>("");
    public addAdultWorkEarnings: IObservable<string> = new Observable<string>("");
    public addAdultPublicAssistance: IObservable<string> = new Observable<string>("");
    public addAdultAllOtherIncome: IObservable<string> = new Observable<string>("");
    /* Social security page */
    public socialSecurityHeader: IObservable<string> = new Observable<string>("");
    public socialSecurityBlurb: IObservable<string> = new Observable<string>("");
    public socialSecurityFormHeader: IObservable<string> = new Observable<string>("");
    public socialSecurityTip: IObservable<string> = new Observable<string>("");
    public socialSecuritySSN: IObservable<string> = new Observable<string>("");
    public socialSecurityNoSSN: IObservable<string> = new Observable<string>("");
    /* Contact info page */
    public contactInfoHeader: IObservable<string> = new Observable<string>("");
    public contactInfoBlurb: IObservable<string> = new Observable<string>("");
    public contactInfoFormHeader: IObservable<string> = new Observable<string>("");
    public contactInfoStreetAddress: IObservable<string> = new Observable<string>("");
    public contactInfoCity: IObservable<string> = new Observable<string>("");
    public contactInfoState: IObservable<string> = new Observable<string>("");
    public contactInfoZip: IObservable<string> = new Observable<string>("");
}