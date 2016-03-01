class AdditionalInfoPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("button").addEventListener("click", (ev) => {
            ev.preventDefault();
            var viewModel = <ViewModel>this.dataContext.value;
            viewModel.submitApplication();
            this.parentElement.appendChild(document.createElement("lunch-dialog-application-complete"));
        });
    }
}
Component.register("lunch-page-additional-info", AdditionalInfoPage);
