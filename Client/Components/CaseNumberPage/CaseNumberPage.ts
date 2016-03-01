class CaseNumberPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("button.noCase").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.shadowRoot.querySelector("input.caseNumber").value = "";
            this.nextPage();
        });
        this.shadowRoot.querySelector("button.next").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.nextPage();
        });
    }
    
    public nextPage(): void {
        var application = <ApplicationModel>this.dataContext.value.application.value;
        application.caseNumber.value = this.shadowRoot.querySelector("input.caseNumber").value;
        if (application.caseNumber.value.length > 0) {
            application.isInAssistancePrograms.value = "true";
        } else {
            application.isInAssistancePrograms.value = "false";
        }
        this.shadowRoot.querySelector("button.noCase").disabled = true;
        this.shadowRoot.querySelector("button.next").disabled = true;
        var lunch = <Lunch>this.parentComponent;
        lunch.navigateTo(<ChildrenPage>document.createElement("lunch-page-children"));
    }
}
Component.register("lunch-page-case-number", CaseNumberPage);
