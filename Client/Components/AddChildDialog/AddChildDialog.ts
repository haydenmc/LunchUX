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
    }
    
    public addChild(): void {
        var child = new Child();
        var form = this.shadowRoot.querySelector("form");
        child.firstName.value = form.elements["firstName"].value;
        child.middleInitial.value = form.elements["middleInitial"].value;
        child.lastName.value = form.elements["lastName"].value;
        child.isStudent.value   
            = (this.shadowRoot.querySelector('input[name="isStudent"]:checked').value)
        child.isFosterChild.value
            = (this.shadowRoot.querySelector('input[name="isFosterChild"]:checked').value)
        child.isHomelessMigrantRunaway.value
            = (this.shadowRoot.querySelector('input[name="isHomelessMigrantRunaway"]:checked').value)
        child.income.value = form.elements["income"].value;
        child.incomeCadence.value = PayCadence.Monthly;
        this.dataContext.value.application.value.children.value.push(child);
        this.parentElement.removeChild(this);
    }
}
Component.register("lunch-dialog-add-child", AddChildDialog);
