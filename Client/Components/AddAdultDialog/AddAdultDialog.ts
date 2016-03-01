class AddAdultDialog extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        // Hack in the placeholder values, since we have no attribute databinding yet...
        this.shadowRoot.querySelector("input.firstName").placeholder
            = this.dataContext.value.languageResources.value.firstName.value;
        this.shadowRoot.querySelector("input.lastName").placeholder
            = this.dataContext.value.languageResources.value.lastName.value;
        this.shadowRoot.querySelector("input.workEarnings").placeholder
            = this.dataContext.value.languageResources.value.monthlyIncome.value;
        this.shadowRoot.querySelector("input.publicAssistance").placeholder
            = this.dataContext.value.languageResources.value.monthlyIncome.value;
        this.shadowRoot.querySelector("input.allOtherIncome").placeholder
            = this.dataContext.value.languageResources.value.monthlyIncome.value;
        
        this.shadowRoot.querySelector("button.add").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.addAdult();
        });
        this.shadowRoot.querySelector("button.cancel").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.parentElement.removeChild(this);
        });
        this.shadowRoot.querySelector("a.help.workEarningsHelp").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.parentElement.appendChild(document.createElement("lunch-help-work-income"));
        });
        this.shadowRoot.querySelector("a.help.publicAssistanceHelp").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.parentElement.appendChild(document.createElement("lunch-help-public-assistance"));
        });
        this.shadowRoot.querySelector("a.help.otherIncomeHelp").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.parentElement.appendChild(document.createElement("lunch-help-other-income"));
        });
    }
    
    public addAdult(): void {
        var adult = new Adult();
        adult.firstName.value = this.shadowRoot.querySelector(".firstName").value;
        adult.lastName.value = this.shadowRoot.querySelector(".lastName").value;
        adult.workEarnings.value = this.shadowRoot.querySelector(".workEarnings").value;
        adult.publicAssistance.value = this.shadowRoot.querySelector(".publicAssistance").value;
        adult.allOtherIncome.value = this.shadowRoot.querySelector(".allOtherIncome").value;
        this.dataContext.value.application.value.adults.value.push(adult);
        this.parentElement.removeChild(this);
    }
}
Component.register("lunch-dialog-add-adult", AddAdultDialog);
