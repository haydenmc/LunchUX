class SocialSecurityPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("input.SSN").placeholder
            = this.dataContext.value.languageResources.value.socialSecuritySSN.value;
        this.shadowRoot.querySelector("button").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.nextPage();
        })
    }
    public nextPage(): void {
        this.shadowRoot.querySelector("button").disabled = true;
        var lunch = <Lunch>this.parentComponent;
        lunch.navigateTo(<ContactInfoPage>document.createElement("lunch-page-contact-info"));
    }
}
Component.register("lunch-page-social-security", SocialSecurityPage);
