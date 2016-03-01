class CaseNumberPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("button.noCase").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.nextPage();
        });
    }
    
    public nextPage(): void {
        var lunch = <Lunch>this.parentComponent;
        lunch.navigateTo(<ChildrenPage>document.createElement("lunch-page-children"));
    }
}
Component.register("lunch-page-case-number", CaseNumberPage);