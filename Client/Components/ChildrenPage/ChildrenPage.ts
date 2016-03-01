class ChildrenPage extends Component {
    public attachedCallback(): void {
        super.attachedCallback();
        this.shadowRoot.querySelector("li.add").addEventListener("click", () => {
            this.invokeAddDialog();
        });
    }
    public invokeAddDialog() {
        this.parentElement.appendChild(document.createElement("lunch-dialog-add-child"));
    }
    public nextPage() {
        
    }
}
Component.register("lunch-page-children", ChildrenPage);
