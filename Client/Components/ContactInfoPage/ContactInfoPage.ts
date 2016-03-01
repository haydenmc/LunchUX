class ContactInfoPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("input.addressLineOne").placeholder
            = this.dataContext.value.languageResources.value.contactInfoStreetAddress.value;
        this.shadowRoot.querySelector("input.city").placeholder
            = this.dataContext.value.languageResources.value.contactInfoCity.value;
        this.shadowRoot.querySelector("input.zip").placeholder
            = this.dataContext.value.languageResources.value.contactInfoZip.value;
        this.shadowRoot.querySelector("button").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.nextPage();
        });
    }
    
    public nextPage() {
        this.shadowRoot.querySelector("button").disabled = true;
        var application = <ApplicationModel>this.dataContext.value.application.value;
        application.addressLineOne.value = this.shadowRoot.querySelector("input.addressLineOne").value;
        application.city.value = this.shadowRoot.querySelector("input.city").value;
        application.state.value = this.shadowRoot.querySelector("select.state").value;
        application.zipCode.value = this.shadowRoot.querySelector("input.zip").value;
        var lunch = <Lunch>this.parentComponent;
        lunch.navigateTo(<AdditionalInfoPage>document.createElement("lunch-page-additional-info"));
    }
}
Component.register("lunch-page-contact-info", ContactInfoPage);
