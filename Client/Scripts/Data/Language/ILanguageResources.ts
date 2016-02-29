interface ILanguageResources {
    /* Introduction page */
    introHeader: IObservable<string>; 
    introBlurb: IObservable<string>;
    introBeginButtonText: IObservable<string>;
    languageHeader: IObservable<string>;
    englishLanguageNameBlurb: IObservable<string>;
    spanishLanguageNameBlurb: IObservable<string>;
    chineseLanguageNameBlurb: IObservable<string>;
    frenchLanguageNameBlurb: IObservable<string>;
    vietnameseLanguageNameBlurb: IObservable<string>;
    tagalogLanguageNameBlurb: IObservable<string>;
    arabicLanguageNameBlurb: IObservable<string>;
    koreanLanguageNameBlurb: IObservable<string>;
}