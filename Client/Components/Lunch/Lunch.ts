/**
 * The main application component. Holds the main DataModel and orchestrates the entire application.
 */
class Lunch extends Application {
    public createdCallback(): void {
        this.dataContext = new Observable(new ViewModel());
    }
    public attachedCallback(): void {
    }
    public navigateTo(c: Component) {
        this.removeChild(this.firstElementChild);
        this.appendChild(c);
    }
}
Component.register("lunch-application", Lunch);
