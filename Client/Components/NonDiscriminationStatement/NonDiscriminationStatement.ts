class NonDiscriminationStatement extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("button.close").addEventListener("click", (ev) => {
            this.parentElement.removeChild(this);
        });
    }
}
Component.register("lunch-statement-non-discrimination", NonDiscriminationStatement);
