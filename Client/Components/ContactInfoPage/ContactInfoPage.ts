class ContactInfoPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("input.addressLineOne").placeholder
            = this.dataContext.value.languageResources.value.contactInfoStreetAddress.value;
        this.shadowRoot.querySelector("input.city").placeholder
            = this.dataContext.value.languageResources.value.contactInfoCity.value;
        this.shadowRoot.querySelector("input.zip").placeholder
            = this.dataContext.value.languageResources.value.contactInfoZip.value;
    }
}
Component.register("lunch-page-contact-info", ContactInfoPage);
