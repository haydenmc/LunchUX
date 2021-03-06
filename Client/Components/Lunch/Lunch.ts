/**
 * The main application component. Holds the main DataModel and orchestrates the entire application.
 */
class Lunch extends Application {
    public createdCallback(): void {
        super.createdCallback();
        this.dataContext = new Observable(new ViewModel());
    }
    public attachedCallback(): void {
        super.attachedCallback();
    }
    public navigateTo(c: Component) {
        // this.removeChild(this.firstElementChild);
        this.appendChild(c);
        setTimeout(() => {
            this.parentElement.scrollTop = this.parentElement.scrollHeight;
        }, 100);
        
    }
}
Component.register("lunch-application", Lunch);
