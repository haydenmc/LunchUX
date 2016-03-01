class AddChildDialog extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        // Hack in the placeholder values, since we have no attribute databinding yet...
        this.shadowRoot.querySelector("input.firstName").placeholder
            = this.dataContext.value.languageResources.value.firstName.value;
        this.shadowRoot.querySelector("input.middleInitial").placeholder
            = this.dataContext.value.languageResources.value.middleInitialAbbrev.value;
        this.shadowRoot.querySelector("input.lastName").placeholder
            = this.dataContext.value.languageResources.value.lastName.value;
        this.shadowRoot.querySelector("input.income").placeholder
            = this.dataContext.value.languageResources.value.monthlyIncome.value;
        
        this.shadowRoot.querySelector("button.add").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.addChild();
        });
        this.shadowRoot.querySelector("button.cancel").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.parentElement.removeChild(this);
        });
    }
    
    public addChild(): void {
        var child = new Child();
        child.firstName.value = this.shadowRoot.querySelector(".firstName").value;
        child.middleInitial.value = this.shadowRoot.querySelector(".middleInitial").value;
        child.lastName.value = this.shadowRoot.querySelector(".lastName").value;
        child.isStudent.value   
            = (this.shadowRoot.querySelector('input[name="isStudent"]:checked').value)
        child.isFosterChild.value
            = (this.shadowRoot.querySelector('input[name="isFosterChild"]:checked').value)
        child.isHomelessMigrantRunaway.value
            = (this.shadowRoot.querySelector('input[name="isHomelessMigrantRunaway"]:checked').value)
        child.income.value = this.shadowRoot.querySelector(".income").value;
        child.incomeCadence.value = PayCadence.Monthly;
        this.dataContext.value.application.value.children.value.push(child);
        this.parentElement.removeChild(this);
    }
}
Component.register("lunch-dialog-add-child", AddChildDialog);
