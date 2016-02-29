/**
 * A simple class to manage animations.
 */
declare class Animator {
    /**
     * Applies an animation with the given CSS class name to the specified element.
     * @param {HTMLElement} element The element to apply the animation to
     * @param {string} name The name as defined by a CSS class
     * @param {boolean?} transient Whether or not the animation should be removed after it has finished (default true)
     * @param {Function?} endCallback Callback to fire when the animation has ended
     */
    static applyAnimation(element: HTMLElement, name: string, transient?: boolean, endCallback?: () => void): void;
}
/**
 * A simple event handler.
 * Maintains a set of callbacks to fire upon some event.
 */
declare class EventHandler<T> {
    private callbacks;
    constructor();
    subscribe(callback: (arg: T) => void): void;
    unSubscribe(callback: (arg: T) => void): void;
    unSubscribeAll(): void;
    fire(arg: T): void;
}
/**
 * This is the base class for every Component (element).
 */
declare class Component extends HTMLElement {
    /**
     * The shadow DOM root for this element.
     */
    protected shadowRoot: any;
    /**
     * The data-context that all data-binding occurs against.
     */
    protected _dataContext: IObservable<any>;
    dataContext: IObservable<any>;
    /**
     * Maintains a reference to the parent Component
     */
    parentComponent: Component;
    /**
     * The data binder that will handle all data binding that occurs for this component.
     */
    protected dataBinder: DataBinder;
    /**
     * Used to update the data context dynamically (by binding, for example)
     */
    private dataContextUpdatedCallback;
    /**
     * Constructor - redirects to createdCallback as required by web components.
     * NOTE: Things you put in the Constructor may be ignored. Put in createdCallback method instead.
     */
    constructor();
    /**
     * Method to register specified class as a web component, and bind it to an element tag.
     *
     * @param {string} elementName The tag of this element in HTML
     * @param {class} theClass The component class to bind this element to
     */
    static register(elementName: string, theClass: any): void;
    /**
     * Called by the browser when an instance of this element/component is created.
     */
    createdCallback(): void;
    /**
     * Called by the browser when this instance is added to the DOM.
     * This is where any 'constructor' processing needs to happen.
     */
    attachedCallback(): void;
    /**
     * Called whenever the data context has changed.
     * @param {IObservable} oldContext The previous data context
     * @param {IObservable} newContext The new data context
     */
    dataContextUpdated(oldContext: IObservable<any>, newContext: IObservable<any>): void;
    /**
     * This method checks the data-context attribute for a binding expression
     * and performs the binding of dataContext if necessary.
     * TODO: This should probably be DataBinder's job.
     * TODO: And also this looks really gross.
     */
    protected processDataContextAttributeBinding(): void;
    /**
     * Applies shadow DOM template if it is defined.
     * TODO: copy content from child elements into shadow, indicated by some kind of binding markup...
     */
    protected applyShadowTemplate(): void;
    /**
     * Searches for event attributes on nodes and binds them to specified functions.
     * @param {Node} node The root node
     */
    protected processEventBindings(node: Node): void;
    /**
     * Applies the data context of this component to any component contained
     * within the specified node.
     * @param {Node} node The root node
     * @param {Observable?} dataContext Optionally the data context to apply, if not the object's
     */
    protected applyMyDataContext(node: Node, dataContext?: IObservable<any>): void;
    /**
     * Sets the parentComponent property of any child Components to specified Component.
     * @param {Node} node The root node
     * @param {Component} component The component to set as parent
     */
    protected setParentComponent(node: Node, component?: Component): void;
    /**
     * Called by the browser when this instance is removed from the DOM.
     */
    detachedCallback(): void;
    /**
     * Called by the browser when an attribute is updated on the DOM.
     * Serves to keep member variables in-sync with attributes on the element.
     *
     * @param {string} attrName Name of the attribute or member variable
     * @param {string} oldVal Old value of the specified attribute
     * @param {string} newVal New value of the specified attribute
     */
    attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void;
}
declare class Application extends Component {
    static instance: any;
    createdCallback(): void;
}
/**
 * A Frame serves as a way to render and navigate between pages contained within.
 */
declare class Frame extends Component {
    /**
     * The current page being rendered.
     */
    private currentPage;
    /**
     * Called by the browser when an instance of this element/component is created.
     */
    createdCallback(): void;
    /**
     * Called by the browser when an instance of this component is attached to the DOM.
     */
    attachedCallback(): void;
    /**
     * Navigate to a specific Page instance.
     * @param {Page} page The page to navigate to
     */
    navigateTo(page: Page): void;
    /**
     * Navigate to a specific Page specified by ID.
     * @param {string} pageId The page ID of the page to navigate to
     */
    navigateToId(pageId: string): void;
    /**
     * Used by Pages to notify the frame that they've loaded.
     * If the page is our intended default, we navigate to it.
     * @param {string} pageId The ID of the page that has loaded
     */
    notifyPageLoaded(pageId: string): void;
}
/**
 * A Page is a collection of content that is rendered inside of a Frame.
 */
declare class Page extends Component {
    /**
     * List of nodes on the DOM that represent page content.
     */
    private contentNodes;
    /**
     * Called by the browser when an instance of this element/component is created.
     */
    createdCallback(): void;
    /**
     * Called by the browser when an instance of this component is attached to the DOM.
     */
    attachedCallback(): void;
    /**
     * Called to show the page in the parent Frame.
     */
    show(): void;
    /**
     * Called to hide this page's content
     */
    hide(): void;
}
/**
 * The repeater control takes a template, and 'repeats' it with data from
 * the observable array of items provided via data context.
 */
declare class Repeater extends Component {
    /**
     * The template this repeater uses for each item.
     */
    private template;
    /**
     * An array retaining information on each item in the repeater.
     */
    private repeaterItems;
    /**
     * Stores the callbacks that should be triggered on item events.
     */
    private itemEventCallbacks;
    /**
     * Called by the browser when an instance of this element/component is created.
     */
    createdCallback(): void;
    /**
     * Called by the browser when this instance is added to the DOM.
     * This is where any 'constructor' processing needs to happen.
     */
    attachedCallback(): void;
    /**
     * Override processing of event bindings - we take care of this ourselves.
     */
    protected processEventBindings(node: Node): void;
    /**
     * Meant to be called if the data context is ever changed, requiring a refresh of the list.
     */
    dataContextUpdated(oldContext: IObservable<any>, newContext: IObservable<any>): void;
    /**
     * Called when an item has been added to the backing observable array.
     * @param {ObservableArrayEventArgs} arg Arguments detailing what was added and where
     */
    itemAdded(arg: ObservableArrayEventArgs<any>): void;
    /**
     * Called when an item has been removed from the backing observable array.
     * @param {ObservableArrayEventArgs} arg Arguments detailing what was removed and where
     */
    itemRemoved(arg: ObservableArrayEventArgs<any>): void;
    /**
     * Reads every item from the observable array, processes data binding for it,
     * and adds it to the DOM. Assumes all processed list info / DOM is clean.
     */
    private populateAllItems();
    /**
     * Used to add an item with the given data context at the given position.
     * @param {Observable<any>} dataContext The data context of the new item
     * @param {number?} position The position the item should be added. Added last if not specified.
     */
    private addItem(dataContext, position?);
    /**
     * Used to remove an existing item at a given position.
     * @param {number} position The position of the item to be removed
     */
    private removeItem(position);
    /**
     * Clears all items, releases bindings, and removes their nodes from the DOM.
     */
    private clearItems();
    /**
     * Applies set of events to particular node
     * @param {Node} node to apply events to
     * @param {any} dataContext Data context for this event
     */
    private applyRepeaterEvents(node, dataContext);
}
/**
 * A class to store information on each item in a Repeater component.
 */
interface RepeaterItem {
    dataContext: IObservable<any>;
    dataBinder: DataBinder;
    nodes: Node[];
}
/**
 * AutoMapper is a utility for deep cloning and processing of incoming JSON objects
 * into proper JS objects with Observable properties for use in DataModels.
 */
declare class AutoMapper {
    /**
     * Maps an object to a new instance of the specified JS class.
     * @param {any} from The object to read from
     * @param {Function} to The class name of the object to map properties to
     */
    static map(from: any, to: {
        new (): any;
    }): any;
}
/**
 * This class serves as the foundation for data binding in Components,
 * and maybe eventually beyond.
 */
declare class DataBinder {
    /**
     * The regular expression used to detect bindings in templates.
     */
    static bindingRegex: RegExp;
    /**
     * A tree to store all of the data bindings maintained in this DataBinder.
     */
    protected bindingTree: DataBinding;
    /**
     * List of registered node bindings.
     */
    protected nodeBindings: NodeBinding[];
    /**
     * The default data-context that data-binding occurs against.
     */
    private _dataContext;
    dataContext: IObservable<any>;
    /**
     * Initializes a new DataBinder
     * @param {Observable<any>} dataContext The data context to use for bindings
     */
    constructor(dataContext?: IObservable<any>);
    /**
     * Searches for bindings in the given string.
     * @param {string} str The string to search for bindings inside of
     * @returns {string[]} An array of bindings found
     */
    static parseBindings(str: string): string[];
    /**
     * Registers any node bindings that occur under the specified node and creates NodeBindings for them.
     * Currently supported: Text nodes.
     * @param {Node} node The root node
     */
    bindNodes(node: Node): void;
    /**
     * Registers a binding for the given path relative to data context and returns the information.
     * If binding exists, the existing binding information is returned.
     * @param {string} path the path to the property being bound relative to data context
     */
    registerBinding(path: string): DataBinding;
    /**
     * Unsubscribes update callbacks for all bindings and removes them from the binding catalog.
     */
    removeAllBindings(binding?: DataBinding): void;
    /**
     * Resolves a property path string to the actual Observable property.
     * @param {string} path The property path to resolve
     * @returns {Observable<any>} The Observable Property
     */
    static resolvePropertyPath(path: string, dataContext: IObservable<any>): IObservable<any>;
}
/**
 * A class to maintain information on a data-bound property.
 * Used to construct a dependency tree of bindings.
 * TODO: Release old events and re-bind when data context changes.
 */
declare class DataBinding {
    /**
     * Data binder to process bindings against
     */
    dataBinder: DataBinder;
    /**
     * Full path relative to data context to the property
     */
    path: string;
    /**
     * Property name
     */
    property: string;
    /**
     * Child bindings that are dependent on this binding
     * (e.g. if this binding is 'property1', a child binding would be 'property1.property2')
     */
    childBindings: {
        [property: string]: DataBinding;
    };
    /**
     * Method that is bound to the property to track updates.
     */
    private updateCallback;
    /**
     * Public event handler that fires whenever the value behind this binding changes.
     */
    onValueChanged: EventHandler<DataBindingValueChangedEvent>;
    /**
     * The value of the property itself.
     */
    value: any;
    /**
     * The Observable instance encapsulating the target property.
     */
    observableValue: IObservable<any>;
    /**
     * Initializes the DataBinding class given a path to the property and a matching data context.
     * @param {string} path The property path to bind
     * @param {Observable<any>} The data context to bind against
     */
    constructor(path: string, dataBinder: DataBinder);
    /**
     * Forces child (dependent) bindings to re-attach their bindings.
     * @param {DataBinding?} binding Optionally specify a starting Binding to traverse from
     * @param {IObservable?} detachFrom Optionally specify a data context to detach from
     */
    reattachChildren(binding?: DataBinding, detachFrom?: IObservable<any>): void;
    /**
     * Detaches and re-attaches to target property.
     * Useful if parent properties or data context changes.
     * @param {IObservable} Optionally specify a data context to detach from
     */
    reattachBinding(detachFrom?: IObservable<any>): void;
    /**
     * Attaches binding to the target property.
     */
    attachBinding(): void;
    /**
     * Detaches binding from the target property.
     * @param {Observable<any>?} dataContext Optionally specify a data context to detach from
     */
    detachBinding(detachFrom?: IObservable<any>): void;
    /**
     * Unsubscribes all listeners from onChanged event handler.
     */
    releaseListeners(): void;
}
/**
 * Event class to communicate when data bindings have updated.
 */
declare class DataBindingValueChangedEvent {
    path: string;
    binding: DataBinding;
    valueChangedEvent: ValueChangedEvent<any>;
}
/**
 * A class to store information on node bindings in the DOM.
 */
declare class NodeBinding {
    /**
     * The Node.
     */
    node: Node;
    /**
     * Properties this node is bound to
     */
    bindings: DataBinding[];
    /**
     * The original (pre-binding) value stored in this node
     */
    private originalValue;
    /**
     * Callback used to update the node when a change is triggered
     */
    updateCallback: (args) => void;
    /**
     * @param {Node} node The node
     * @param {DataBinding[]} bindings Data Bindings associated with this node
     */
    constructor(node: Node, bindings: DataBinding[]);
    /**
     * Updates node with values from data bindings.
     */
    updateNode(): void;
}
interface IObservable<T> {
    value: T;
    onValueChanged: EventHandler<ValueChangedEvent<T>>;
}
interface ValueChangedEvent<T> {
    oldValue: T;
    newValue: T;
}
declare enum httpMethod {
    GET = 0,
    POST = 1,
}
/**
 * This class exists to provide an easy way to make HTTP requests
 * And get JSON objects in response.
 */
declare class JsonRequest {
    /**
     * Internal method to send an http request to some URL and
     * return a JSON object via a Promise.
     *
     * @param url The URL to send the request to
     * @param httpMethod HTTP method used in request
     * @param postData POST data to send, if the method used is post
     * @param authorization string Authorization header information
     * @param contentType Content-Type header
     */
    private static httpRequest<T>(url, method, postData?, authorization?, contentType?);
    /**
     * A method to perform a GET HTTP request and parse resulting JSON
     *
     * @param url URL to request
     * @param authorization Authorization header
     * @param contentType Content-Type header
     */
    static httpGet<T>(url: string, authorization?: string, contentType?: string): Promise<T>;
    /**
     * A method to perform a POST HTTP request and parse resulting JSON
     *
     * @param url URL to request
     * @param postData JSON post data to send
     * @param authorization Authorization header
     * @param contentType Content-Type header
     */
    static httpPost<T>(url: string, postData: any, authorization?: string, contentType?: string): Promise<T>;
}
/**
 * A simple value store that notifies any subscribers of changes to its value.
 */
declare class Observable<T> implements IObservable<T> {
    private _value;
    value: T;
    private _onValueChanged;
    onValueChanged: EventHandler<ValueChangedEvent<T>>;
    constructor(defaultValue?: T);
}
interface ObservableArrayEventArgs<T> {
    item: T;
    position: number;
}
declare class ObservableArray<T> {
    /**
     * Event handler that is fired when items are added
     */
    itemAdded: EventHandler<ObservableArrayEventArgs<T>>;
    /**
     * Event handler that is fired when items are removed
     */
    itemRemoved: EventHandler<ObservableArrayEventArgs<T>>;
    /**
     * Property that returns the size of the array
     */
    size: number;
    /**
     * Backing array store for the ObservableArray
     */
    private itemStore;
    /**
     * An array that fires events when items are added or removed.
     * @constructor
     */
    constructor();
    /**
     * Adds an item to the end of the array
     * @param {T} item The item to add
     */
    push(item: T): void;
    /**
     * Inserts at item at the specified position (0 = start)
     * @param {T} item The item to insert
     * @param {number} index The index to insert at
     */
    insert(item: T, index: number): void;
    /**
     * Gets an item from the array at the specified index
     * @param {number} index - The index to fetch the item at
     */
    get(index: number): T;
    /**
     * Removes a specified item from the array
     * @param {T} item - The item to remove from the array
     */
    remove(item: T): void;
    /**
     * Removes the item at the specified index
     * @param {number} index - the index at which to remove the item
     */
    removeAt(index: number): void;
    /**
     * Retrieves the index of the specified item in the array
     * @returns {number} - The index of the specified item, or -1
     */
    indexOf(item: T): number;
}
/**
 * An ObservableProxy routes Observable properties through conversion functions to modify the value.
 */
declare class ObservableProxy<T, U> implements IObservable<T> {
    /**
     * The IObservable class that this ObservableProxy acts as a proxy for.
     */
    private source;
    /**
     * The function that transforms values from the source Observable type to our own type.
     */
    private outgoing;
    /**
     * The function that transforms values from our own type to the source Observable type.
     * First parameter is the new value.
     * Second parameter is the current value of the base Observable.
     */
    private incoming;
    /**
     * Retrieves the value by running the appropriate conversion on the source Observable's value.
     */
    value: T;
    /**
     * Event to signal listeners when the value has changed.
     */
    onValueChanged: EventHandler<ValueChangedEvent<T>>;
    /**
     * Construct a new ObservableProxy on top of the given Observable with specified conversion functions.
     * @param {IObservable} source The source Observable
     * @prarm {Function} outgoing The function used to convert values from the source type to own type
     * @param {Function} incoming The function used to convert values from own type to source type
     */
    constructor(source: IObservable<U>, outgoing: (source: U) => T, incoming: (source: T, value: U) => U);
}
