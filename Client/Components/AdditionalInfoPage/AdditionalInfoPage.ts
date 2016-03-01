class AdditionalInfoPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("button").addEventListener("click", (ev) => {
            ev.preventDefault();
            var viewModel = <ViewModel>this.dataContext.value;
            viewModel.submitApplication();
            this.parentElement.appendChild(document.createElement("lunch-dialog-application-complete"));
        });
        
        this.shadowRoot.querySelector("a.nonDiscrimination").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.parentElement.appendChild(document.createElement("lunch-statement-non-discrimination"))
        });
        this.shadowRoot.querySelector("a.useOfInformation").addEventListener("click", (ev) => {
            ev.preventDefault();
            this.parentElement.appendChild(document.createElement("lunch-statement-use-of-information"))
        });
    }
}
Component.register("lunch-page-additional-info", AdditionalInfoPage);
