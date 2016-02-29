class IntroPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("form").addEventListener("submit", (ev) => { 
            ev.preventDefault();
            this.continue()
        });
    }
    public continue(): void {
        var lunch = <Lunch>this.parentComponent;
        lunch.navigateTo(<AccountInfoPage>document.createElement("lunch-page-account-info"));
    }
}
Component.register("lunch-page-intro", IntroPage);
