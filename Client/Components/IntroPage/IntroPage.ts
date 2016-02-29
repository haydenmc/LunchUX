class IntroPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("button").addEventListener("click", () => this.continue());
    }
    public continue(): void {
        var lunch = <Lunch>this.parentComponent;
        lunch.navigateTo(<LanguagePage>document.createElement("lunch-page-language"));
    }
}
Component.register("lunch-page-intro", IntroPage);
