class AccountInfoPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        
        // Hack in the placeholder values, since we have no attribute databinding yet...
        this.shadowRoot.querySelector("#firstName").placeholder
            = this.dataContext.value.languageResources.value.accountInfoPlaceholderFirstName.value;
        this.shadowRoot.querySelector("#lastName").placeholder
            = this.dataContext.value.languageResources.value.accountInfoPlaceholderLastName.value;
        this.shadowRoot.querySelector("#email").placeholder
            = this.dataContext.value.languageResources.value.accountInfoPlaceholderEmail.value;
        this.shadowRoot.querySelector("#tel").placeholder
            = this.dataContext.value.languageResources.value.accountInfoPlaceholderPhone.value;
        this.shadowRoot.querySelector("#password").placeholder
            = this.dataContext.value.languageResources.value.accountInfoPlaceholderPassword.value;
            
        this.shadowRoot.querySelector("form").addEventListener("submit", (ev) => { 
            ev.preventDefault();
            this.continue()
        });
    }
    public continue(): void {
        this.shadowRoot.querySelector("button").disabled = true;
        var application = <ApplicationModel>this.dataContext.value.application.value;
        application.firstName.value = this.shadowRoot.querySelector("#firstName").value;
        application.lastName.value = this.shadowRoot.querySelector("#lastName").value;
        application.email.value = this.shadowRoot.querySelector("#email").value;
        application.phone.value = this.shadowRoot.querySelector("#tel").value;
        application.password.value = this.shadowRoot.querySelector("#password").value;
        
        // this.dataContext.value.createApplication();
        // TODO: Listen to return value and show error.
        var lunch = <Lunch>this.parentComponent;
        lunch.navigateTo(<AgreementPage>document.createElement("lunch-page-agreement"));
    }
}
Component.register("lunch-page-account-info", AccountInfoPage);
