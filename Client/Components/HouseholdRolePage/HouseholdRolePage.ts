class HouseholdRolePage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("button").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.submit();
        });
    }
    public submit(): void {
        var lunch = <Lunch>this.parentComponent;
        lunch.navigateTo(<CaseNumberPage>document.createElement("lunch-page-case-number"));
    }
}
Component.register("lunch-page-household-role", HouseholdRolePage);
