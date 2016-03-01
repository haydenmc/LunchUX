class AgreementPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("button").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.submit();
        });
    }
    public submit(): void {
        this.shadowRoot.querySelector("button").disabled = true;
        var lunch = <Lunch>this.parentComponent;
        lunch.navigateTo(<CaseNumberPage>document.createElement("lunch-page-case-number"));
    }
}
Component.register("lunch-page-agreement", AgreementPage);
