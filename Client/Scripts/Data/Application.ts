class ApplicationModel {
    public applicationId: Observable<string> = new Observable<string>("");
    public firstName: Observable<string> = new Observable<string>("");
    public lastName: Observable<string> = new Observable<string>("");
    public email: Observable<string> = new Observable<string>("");
    public phone: Observable<string> = new Observable<string>("");
    public password: Observable<string> = new Observable<string>("");
}