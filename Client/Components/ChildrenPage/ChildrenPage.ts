class ChildrenPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("li.add").addEventListener("click", (ev) => {
            this.invokeAddDialog();
        });
        this.shadowRoot.querySelector("button").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.nextPage();
        });
    }
    public invokeAddDialog() {
        this.parentElement.appendChild(document.createElement("lunch-dialog-add-child"));
    }
    public nextPage() {
        this.shadowRoot.querySelector("button").disabled = true;
        var lunch = <Lunch>this.parentComponent;
        lunch.navigateTo(<AdultsPage>document.createElement("lunch-page-adults"));
    }
}
Component.register("lunch-page-children", ChildrenPage);
