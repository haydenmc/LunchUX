class AdultsPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("li.add").addEventListener("click", () => {
            this.invokeAddDialog();
        });
        this.shadowRoot.querySelector("button").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.nextPage();
        });
    }
    public invokeAddDialog() {
        this.parentElement.appendChild(document.createElement("lunch-dialog-add-adult"));
    }
    public nextPage() {
        this.shadowRoot.querySelector("button").disabled = true;
        var lunch = <Lunch>this.parentComponent;
        lunch.navigateTo(<AdultsPage>document.createElement("lunch-page-social-security"));
    }
}
Component.register("lunch-page-adults", AdultsPage);
