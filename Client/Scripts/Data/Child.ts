class Child {
    public childId: Observable<string> = new Observable<string>("");
    public firstName: Observable<string> = new Observable<string>("");
    public middleInitial: Observable<string> = new Observable<string>("");
    public lastName: Observable<string> = new Observable<string>("");
    public isStudent: Observable<boolean> = new Observable<boolean>(false);
    public isFosterChild: Observable<boolean> = new Observable<boolean>(false);
    public isHomelessMigrantRunaway: Observable<boolean> = new Observable<boolean>(false);
    public income: Observable<number> = new Observable<number>(0);
    public incomeCadence: Observable<PayCadence> = new Observable<number>(PayCadence.Other);
}