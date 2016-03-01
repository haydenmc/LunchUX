class Adult {
    public adultId: Observable<string> = new Observable<string>("");
    public firstName: Observable<string> = new Observable<string>("");
    public lastName: Observable<string> = new Observable<string>("");
    public workEarnings: Observable<number> = new Observable<number>(0);
    public workEarningsCadence: Observable<number> = new Observable<number>(PayCadence.Monthly);
    public publicAssistance: Observable<number> = new Observable<number>(0);
    public publicAssistanceCadence: Observable<number> = new Observable<number>(PayCadence.Monthly);
    public allOtherIncome: Observable<number> = new Observable<number>(0);
    public allOtherIncomeCadence: Observable<number> = new Observable<number>(PayCadence.Monthly);
}