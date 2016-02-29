var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * A simple class to manage animations.
 */
var Animator = (function () {
    function Animator() {
    }
    /**
     * Applies an animation with the given CSS class name to the specified element.
     * @param {HTMLElement} element The element to apply the animation to
     * @param {string} name The name as defined by a CSS class
     * @param {boolean?} transient Whether or not the animation should be removed after it has finished (default true)
     * @param {Function?} endCallback Callback to fire when the animation has ended
     */
    Animator.applyAnimation = function (element, name, transient, endCallback) {
        if (typeof transient === "undefined") {
            transient = true;
        }
        if (typeof endCallback !== "undefined") {
            element.addEventListener("animationend", endCallback);
        }
        if (transient) {
            var endEvent = function (evt) {
                element.classList.remove(name);
                element.removeEventListener("animationend", endEvent);
                if (typeof endCallback !== "undefined") {
                    element.removeEventListener("animationend", endCallback);
                }
            };
            element.addEventListener("animationend", endEvent);
        }
        element.classList.add(name);
    };
    return Animator;
}());
/**
 * A simple event handler.
 * Maintains a set of callbacks to fire upon some event.
 */
var EventHandler = (function () {
    function EventHandler() {
        this.callbacks = new Array();
    }
    EventHandler.prototype.subscribe = function (callback) {
        this.callbacks.push(callback);
    };
    EventHandler.prototype.unSubscribe = function (callback) {
        var index = this.callbacks.indexOf(callback);
        if (index >= 0) {
            this.callbacks.splice(index, 1);
        }
    };
    EventHandler.prototype.unSubscribeAll = function () {
        this.callbacks = new Array();
    };
    EventHandler.prototype.fire = function (arg) {
        for (var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i](arg);
        }
    };
    return EventHandler;
}());
/**
 * This is the base class for every Component (element).
 */
var Component = (function (_super) {
    __extends(Component, _super);
    /**
     * Constructor - redirects to createdCallback as required by web components.
     * NOTE: Things you put in the Constructor may be ignored. Put in createdCallback method instead.
     */
    function Component() {
        _super.call(this);
        this.createdCallback();
    }
    Object.defineProperty(Component.prototype, "dataContext", {
        /* tslint:enable:variable-name */
        get: function () {
            return this._dataContext;
        },
        set: function (newContext) {
            if (newContext !== this._dataContext) {
                var oldContext = this._dataContext;
                this._dataContext = newContext;
                if (typeof oldContext !== "undefined" && newContext !== oldContext) {
                    this.dataContextUpdated(oldContext, newContext);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Method to register specified class as a web component, and bind it to an element tag.
     *
     * @param {string} elementName The tag of this element in HTML
     * @param {class} theClass The component class to bind this element to
     */
    Component.register = function (elementName, theClass) {
        document.registerElement(elementName, {
            prototype: theClass.prototype
        });
    };
    /**
     * Called by the browser when an instance of this element/component is created.
     */
    Component.prototype.createdCallback = function () {
        var _this = this;
        console.log("Component created: " + this.tagName);
        this.dataContextUpdatedCallback = function (arg) {
            _this.dataContext = arg.binding.observableValue;
        };
    };
    /**
     * Called by the browser when this instance is added to the DOM.
     * This is where any 'constructor' processing needs to happen.
     */
    Component.prototype.attachedCallback = function () {
        console.log("Component attached.");
        // Find our parent component if one isn't defined.
        if (typeof this.parentComponent === "undefined") {
            var parentElement = this.parentElement;
            while (!(parentElement instanceof Component)) {
                parentElement = parentElement.parentElement;
                if (parentElement == null) {
                    break;
                }
            }
            this.parentComponent = parentElement;
        }
        // Set data context to that of our parent component if it is not yet defined.
        if (typeof this.dataContext === "undefined" && this.parentComponent) {
            this.dataContext = this.parentComponent.dataContext;
        }
        // Bind using data-context attribute if any.
        this.processDataContextAttributeBinding();
        // Apply data binding
        this.dataBinder = new DataBinder(this.dataContext);
        // Find and apply template.
        this.applyShadowTemplate();
    };
    /**
     * Called whenever the data context has changed.
     * @param {IObservable} oldContext The previous data context
     * @param {IObservable} newContext The new data context
     */
    Component.prototype.dataContextUpdated = function (oldContext, newContext) {
        if (this.dataBinder) {
            this.dataBinder.dataContext = newContext;
        }
    };
    /**
     * This method checks the data-context attribute for a binding expression
     * and performs the binding of dataContext if necessary.
     * TODO: This should probably be DataBinder's job.
     * TODO: And also this looks really gross.
     */
    Component.prototype.processDataContextAttributeBinding = function () {
        var dataContextAttr = this.attributes.getNamedItem("data-context");
        if (dataContextAttr != null && dataContextAttr.value !== "") {
            var dataContextAttrBindingMatches = dataContextAttr.value.match(DataBinder.bindingRegex);
            if (dataContextAttrBindingMatches != null && dataContextAttrBindingMatches.length > 0) {
                var dataContextAttrBindingName = dataContextAttrBindingMatches[0].substr(2, dataContextAttrBindingMatches[0].length - 4);
                var binding = this.parentComponent.dataBinder.registerBinding(dataContextAttrBindingName);
                binding.onValueChanged.subscribe(this.dataContextUpdatedCallback);
                this._dataContext = binding.observableValue; // Update _dataContext so we don't fire a change event.
            }
            else {
                throw new Error("Couldn't parse data context binding expression '"
                    + dataContextAttr.value + "' of " + this.tagName
                    + ". Bindings should be of format {{bindingPropertyName}}.");
            }
        }
    };
    /**
     * Applies shadow DOM template if it is defined.
     * TODO: copy content from child elements into shadow, indicated by some kind of binding markup...
     */
    Component.prototype.applyShadowTemplate = function () {
        var template = document.querySelector("template#" + this.tagName.toLowerCase());
        if (typeof template !== "undefined" && template != null) {
            var clone = document.importNode(template.content, true);
            this.shadowRoot = this.createShadowRoot();
            // Apply data-context to all shadow components (they can't break through to parent components)
            for (var i = 0; i < clone.childNodes.length; i++) {
                this.applyMyDataContext(clone.childNodes[i]);
                this.setParentComponent(clone.childNodes[i]);
            }
            this.shadowRoot.appendChild(clone);
            // HACK: Work with webcomponents.js to maintain style encapsulation
            if (window.ShadowDOMPolyfill) {
                var style = this.shadowRoot.querySelector("style");
                if (style) {
                    style.innerHTML = window.WebComponents.ShadowCSS.shimStyle(style, this.tagName.toLowerCase());
                }
            }
            // Process text node bindings on the shadow template.
            this.dataBinder.bindNodes(this.shadowRoot);
            // Process event bindings
            this.processEventBindings(this.shadowRoot);
        }
    };
    /**
     * Searches for event attributes on nodes and binds them to specified functions.
     * @param {Node} node The root node
     */
    Component.prototype.processEventBindings = function (node) {
        var _this = this;
        if (node.nodeType === 1) {
            for (var i = 0; i < node.attributes.length; i++) {
                var attrName = node.attributes[i].name.toLowerCase();
                var attrValue = node.attributes[i].value;
                if (attrName.substr(0, 11) === "data-event-") {
                    var eventName = attrName.substr(11, attrName.length - 11);
                    if (typeof this[attrValue] !== "undefined") {
                        node.addEventListener(eventName, function (arg) { return _this[attrValue](arg); });
                    }
                }
            }
        }
        for (var i = 0; i < node.childNodes.length; i++) {
            this.processEventBindings(node.childNodes[i]);
        }
    };
    /**
     * Applies the data context of this component to any component contained
     * within the specified node.
     * @param {Node} node The root node
     * @param {Observable?} dataContext Optionally the data context to apply, if not the object's
     */
    Component.prototype.applyMyDataContext = function (node, dataContext) {
        if (typeof dataContext === "undefined" || dataContext == null) {
            dataContext = this.dataContext;
        }
        if (node instanceof Component) {
            node.dataContext = dataContext;
        }
        else {
            for (var i = 0; i < node.childNodes.length; i++) {
                this.applyMyDataContext(node.childNodes[i], dataContext);
            }
        }
    };
    /**
     * Sets the parentComponent property of any child Components to specified Component.
     * @param {Node} node The root node
     * @param {Component} component The component to set as parent
     */
    Component.prototype.setParentComponent = function (node, component) {
        var newParent = this;
        if (component) {
            newParent = component;
        }
        if (node instanceof Component) {
            node.parentComponent = newParent;
        }
        else {
            for (var i = 0; i < node.childNodes.length; i++) {
                this.setParentComponent(node.childNodes[i], component);
            }
        }
    };
    /**
     * Called by the browser when this instance is removed from the DOM.
     */
    Component.prototype.detachedCallback = function () {
        console.log("Component detached.");
    };
    /**
     * Called by the browser when an attribute is updated on the DOM.
     * Serves to keep member variables in-sync with attributes on the element.
     *
     * @param {string} attrName Name of the attribute or member variable
     * @param {string} oldVal Old value of the specified attribute
     * @param {string} newVal New value of the specified attribute
     */
    Component.prototype.attributeChangedCallback = function (attrName, oldVal, newVal) {
        console.log("Attribute '" + attrName + "' changed.");
        if (typeof this[attrName] !== "undefined") {
            if (this[attrName] instanceof Observable) {
                this[attrName].value = newVal;
            }
            else {
                this[attrName] = newVal;
            }
        }
    };
    return Component;
}(HTMLElement));
/// <reference path="Component.ts" />
var Application = (function (_super) {
    __extends(Application, _super);
    function Application() {
        _super.apply(this, arguments);
    }
    Application.prototype.createdCallback = function () {
        _super.prototype.createdCallback.call(this);
        Application.instance = this;
    };
    return Application;
}(Component));
Component.register("ui-application", Application);
/// <reference path="Component.ts" />
/**
 * A Frame serves as a way to render and navigate between pages contained within.
 */
var Frame = (function (_super) {
    __extends(Frame, _super);
    function Frame() {
        _super.apply(this, arguments);
    }
    /**
     * Called by the browser when an instance of this element/component is created.
     */
    Frame.prototype.createdCallback = function () {
        _super.prototype.createdCallback.call(this);
    };
    /**
     * Called by the browser when an instance of this component is attached to the DOM.
     */
    Frame.prototype.attachedCallback = function () {
        _super.prototype.attachedCallback.call(this);
    };
    /**
     * Navigate to a specific Page instance.
     * @param {Page} page The page to navigate to
     */
    Frame.prototype.navigateTo = function (page) {
        if (this.currentPage !== page) {
            if (this.currentPage) {
                this.currentPage.hide();
            }
            this.currentPage = page;
            page.show();
        }
    };
    /**
     * Navigate to a specific Page specified by ID.
     * @param {string} pageId The page ID of the page to navigate to
     */
    Frame.prototype.navigateToId = function (pageId) {
        // Find this page
        var page;
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i] instanceof Page
                && this.children[i].attributes.getNamedItem("data-page-id")
                && this.children[i].attributes.getNamedItem("data-page-id").value === pageId) {
                page = this.children[i];
            }
        }
        if (page) {
            this.navigateTo(page);
        }
        else {
            console.error("Attempted to navigate to non-existent page ID '" + pageId + "'.");
        }
    };
    /**
     * Used by Pages to notify the frame that they've loaded.
     * If the page is our intended default, we navigate to it.
     * @param {string} pageId The ID of the page that has loaded
     */
    Frame.prototype.notifyPageLoaded = function (pageId) {
        if (this.currentPage) {
            return;
        }
        var defaultPageAttr = this.attributes.getNamedItem("data-default-page");
        if (defaultPageAttr) {
            if (pageId === defaultPageAttr.value) {
                this.navigateToId(pageId);
            }
        }
        else {
            this.navigateToId(pageId);
        }
    };
    return Frame;
}(Component));
Component.register("ui-frame", Frame);
/// <reference path="Component.ts" />
/**
 * A Page is a collection of content that is rendered inside of a Frame.
 */
var Page = (function (_super) {
    __extends(Page, _super);
    function Page() {
        _super.apply(this, arguments);
    }
    /**
     * Called by the browser when an instance of this element/component is created.
     */
    Page.prototype.createdCallback = function () {
        _super.prototype.createdCallback.call(this);
        this.contentNodes = new Array();
    };
    /**
     * Called by the browser when an instance of this component is attached to the DOM.
     */
    Page.prototype.attachedCallback = function () {
        _super.prototype.attachedCallback.call(this);
        // Notify our parent frame that we've loaded.
        var pageIdAttr = this.attributes.getNamedItem("data-page-id");
        var pageId = "";
        if (pageIdAttr) {
            pageId = pageIdAttr.value;
        }
        var frame = this.parentElement;
        if (frame instanceof Frame) {
            frame.notifyPageLoaded(pageId);
        }
    };
    /**
     * Called to show the page in the parent Frame.
     */
    Page.prototype.show = function () {
        // Get reference to parent frame
        var frame = this.parentNode;
        var template = this.querySelector("template");
        if (template) {
            var clone = document.importNode(template.content, true);
            for (var i = 0; i < clone.childNodes.length; i++) {
                this.contentNodes.push(clone.childNodes[i]);
                this.setParentComponent(clone.childNodes[i]);
            }
            this.appendChild(clone);
            for (var i = 0; i < clone.childNodes.length; i++) {
                this.dataBinder.bindNodes(clone.childNodes[i]);
            }
        }
        else {
            console.error("Page defined without template.");
        }
    };
    /**
     * Called to hide this page's content
     */
    Page.prototype.hide = function () {
        return;
    };
    return Page;
}(Component));
Component.register("ui-page", Page);
/// <reference path="Component.ts" />
/**
 * The repeater control takes a template, and 'repeats' it with data from
 * the observable array of items provided via data context.
 */
var Repeater = (function (_super) {
    __extends(Repeater, _super);
    function Repeater() {
        _super.apply(this, arguments);
    }
    /**
     * Called by the browser when an instance of this element/component is created.
     */
    Repeater.prototype.createdCallback = function () {
        _super.prototype.createdCallback.call(this);
        this.repeaterItems = [];
        this.itemEventCallbacks = {};
    };
    /**
     * Called by the browser when this instance is added to the DOM.
     * This is where any 'constructor' processing needs to happen.
     */
    Repeater.prototype.attachedCallback = function () {
        var _this = this;
        _super.prototype.attachedCallback.call(this);
        this.template = this.querySelector("template");
        if (this.template == null) {
            throw new Error("Template undefined for repeater component."
                + " A repeater element should always contain a template element.");
        }
        if (!(this.dataContext.value instanceof ObservableArray)) {
            throw new Error("Invalid data context for repeater component."
                + " A repeater element should have an observable array set as the data context.");
        }
        // Check if we have any events to bind
        for (var i = 0; i < this.attributes.length; i++) {
            var attributeName = this.attributes[i].name;
            var attributeValue = this.attributes[i].value;
            if (attributeName.indexOf("data-event-item-") === 0) {
                var eventName = attributeName.replace("data-event-item-", "");
                if (this.parentComponent && this.parentComponent[attributeValue]) {
                    this.itemEventCallbacks[eventName] = this.parentComponent[attributeValue];
                }
                else {
                    console.error(this.tagName + " attempted to bind event to unexisting callback '"
                        + attributeValue + "' on "
                        + this.parentComponent.tagName);
                }
            }
        }
        // Populate our items (if we have any)
        if (this.dataContext && this.dataContext.value instanceof ObservableArray) {
            this.populateAllItems();
        }
        else {
            console.warn(this.tagName + " attached without a valid data context, expecting an ObservableArray.");
        }
        // Bind add + remove events
        this.dataContext.value.itemAdded.subscribe(function (arg) { return _this.itemAdded(arg); });
        this.dataContext.value.itemRemoved.subscribe(function (arg) { return _this.itemRemoved(arg); });
    };
    /**
     * Override processing of event bindings - we take care of this ourselves.
     */
    Repeater.prototype.processEventBindings = function (node) {
        return;
    };
    /**
     * Meant to be called if the data context is ever changed, requiring a refresh of the list.
     */
    Repeater.prototype.dataContextUpdated = function (oldContext, newContext) {
        var _this = this;
        _super.prototype.dataContextUpdated.call(this, oldContext, newContext);
        this.clearItems();
        this.populateAllItems();
        this.dataContext.value.itemAdded.subscribe(function (arg) { return _this.itemAdded(arg); });
        this.dataContext.value.itemRemoved.subscribe(function (arg) { return _this.itemRemoved(arg); });
    };
    /**
     * Called when an item has been added to the backing observable array.
     * @param {ObservableArrayEventArgs} arg Arguments detailing what was added and where
     */
    Repeater.prototype.itemAdded = function (arg) {
        // Throw the item into an observable for data context and bindings
        var itemDataContext = new Observable(arg.item);
        this.addItem(itemDataContext, arg.position);
    };
    /**
     * Called when an item has been removed from the backing observable array.
     * @param {ObservableArrayEventArgs} arg Arguments detailing what was removed and where
     */
    Repeater.prototype.itemRemoved = function (arg) {
        this.removeItem(arg.position);
    };
    /**
     * Reads every item from the observable array, processes data binding for it,
     * and adds it to the DOM. Assumes all processed list info / DOM is clean.
     */
    Repeater.prototype.populateAllItems = function () {
        console.log("REPEATER: Populating all items.");
        var array = this.dataContext.value;
        for (var i = 0; i < array.size; i++) {
            var itemDataContext = new Observable(array.get(i));
            this.addItem(itemDataContext);
        }
    };
    /**
     * Used to add an item with the given data context at the given position.
     * @param {Observable<any>} dataContext The data context of the new item
     * @param {number?} position The position the item should be added. Added last if not specified.
     */
    Repeater.prototype.addItem = function (dataContext, position) {
        if (typeof position === "undefined") {
            position = this.repeaterItems.length;
        }
        var newItem = {
            dataContext: dataContext,
            dataBinder: new DataBinder(dataContext),
            nodes: []
        };
        // Clone the item template, apply data context to any components, apply text node bindings
        var clone = document.importNode(this.template.content, true);
        for (var i = 0; i < clone.childNodes.length; i++) {
            newItem.nodes.push(clone.childNodes[i]);
            this.applyMyDataContext(clone.childNodes[i], dataContext);
            this.setParentComponent(clone.childNodes[i], this.parentComponent);
            this.applyRepeaterEvents(clone.childNodes[i], dataContext);
            newItem.dataBinder.bindNodes(clone.childNodes[i]);
        }
        // Capture the reference node before we shift the reference array
        var refNode = null;
        if (this.repeaterItems.length === 0) {
            refNode = this.nextSibling;
        }
        else if (position < this.repeaterItems.length) {
            refNode = this.repeaterItems[position].nodes[0];
        }
        else {
            var lastItem = this.repeaterItems[this.repeaterItems.length - 1];
            refNode = lastItem.nodes[lastItem.nodes.length - 1].nextSibling;
        }
        this.repeaterItems.splice(position, 0, newItem);
        // Append to the DOM in the proper place
        this.parentNode.insertBefore(clone, refNode);
    };
    /**
     * Used to remove an existing item at a given position.
     * @param {number} position The position of the item to be removed
     */
    Repeater.prototype.removeItem = function (position) {
        var item = this.repeaterItems[position];
        // Remove item from array
        this.repeaterItems.splice(position, 1);
        // Release all the associated data bindings
        item.dataBinder.removeAllBindings();
        // Remove nodes from the DOM
        var nodesToBeRemoved = item.nodes;
        for (var i = 0; i < nodesToBeRemoved.length; i++) {
            nodesToBeRemoved[i].parentNode.removeChild(nodesToBeRemoved[i]);
        }
    };
    /**
     * Clears all items, releases bindings, and removes their nodes from the DOM.
     */
    Repeater.prototype.clearItems = function () {
        for (var i = this.repeaterItems.length - 1; i >= 0; i--) {
            this.removeItem(i);
        }
    };
    /**
     * Applies set of events to particular node
     * @param {Node} node to apply events to
     * @param {any} dataContext Data context for this event
     */
    Repeater.prototype.applyRepeaterEvents = function (node, dataContext) {
        var _this = this;
        for (var eventName in this.itemEventCallbacks) {
            if (this.itemEventCallbacks[eventName]) {
                node.addEventListener(eventName, function (args) { return _this.itemEventCallbacks[eventName](dataContext); });
            }
        }
    };
    return Repeater;
}(Component));
Component.register("ui-repeater", Repeater);
/**
 * AutoMapper is a utility for deep cloning and processing of incoming JSON objects
 * into proper JS objects with Observable properties for use in DataModels.
 */
var AutoMapper = (function () {
    function AutoMapper() {
    }
    /**
     * Maps an object to a new instance of the specified JS class.
     * @param {any} from The object to read from
     * @param {Function} to The class name of the object to map properties to
     */
    AutoMapper.map = function (from, to) {
        var newObj = new to();
        for (var i in newObj) {
            // HACK: Check if this is an IObservable by seeing if it has a .value
            if (newObj.hasOwnProperty(i) && typeof newObj[i].value !== "undefined") {
                if (typeof from[i] !== "undefined") {
                    if (typeof from[i].value !== "undefined") {
                        newObj[i].value = from[i].value;
                    }
                    else {
                        newObj[i].value = from[i];
                    }
                }
            }
        }
        return newObj;
    };
    return AutoMapper;
}());
/**
 * This class serves as the foundation for data binding in Components,
 * and maybe eventually beyond.
 */
var DataBinder = (function () {
    /**
     * Initializes a new DataBinder
     * @param {Observable<any>} dataContext The data context to use for bindings
     */
    function DataBinder(dataContext) {
        this._dataContext = dataContext;
        this.bindingTree = new DataBinding("", this);
        this.nodeBindings = [];
    }
    Object.defineProperty(DataBinder.prototype, "dataContext", {
        /* tslint:enable:variable-name */
        get: function () {
            return this._dataContext;
        },
        set: function (newContext) {
            if (this._dataContext !== newContext) {
                var oldContext = this._dataContext;
                this._dataContext = newContext;
                this.bindingTree.reattachBinding(oldContext);
                this.bindingTree.reattachChildren(null, oldContext);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Searches for bindings in the given string.
     * @param {string} str The string to search for bindings inside of
     * @returns {string[]} An array of bindings found
     */
    DataBinder.parseBindings = function (str) {
        var bindingProperties = [];
        var bindingMatches = str.match(DataBinder.bindingRegex);
        if (bindingMatches != null && bindingMatches.length > 0) {
            for (var i = 0; i < bindingMatches.length; i++) {
                var path = bindingMatches[i].substr(2, bindingMatches[i].length - 4);
                bindingProperties.push(path);
            }
        }
        return bindingProperties;
    };
    /**
     * Registers any node bindings that occur under the specified node and creates NodeBindings for them.
     * Currently supported: Text nodes.
     * @param {Node} node The root node
     */
    DataBinder.prototype.bindNodes = function (node) {
        if (node instanceof Component) {
            return; // Don't attempt to data-bind inside of a Component.
        }
        if (node.nodeType === 1 || node.nodeType === 11) {
            // TODO: scan for attribute bindings, etc. in element nodes
            for (var i = 0; i < node.childNodes.length; i++) {
                this.bindNodes(node.childNodes[i]);
            }
        }
        else if (node.nodeType === 3) {
            var bindingMatches = DataBinder.parseBindings(node.nodeValue);
            var bindings = [];
            for (var i = 0; i < bindingMatches.length; i++) {
                bindings.push(this.registerBinding(bindingMatches[i]));
            }
            if (bindings.length > 0) {
                this.nodeBindings.push(new NodeBinding(node, bindings));
            }
        }
    };
    /**
     * Registers a binding for the given path relative to data context and returns the information.
     * If binding exists, the existing binding information is returned.
     * @param {string} path the path to the property being bound relative to data context
     */
    DataBinder.prototype.registerBinding = function (path) {
        if (path === "") {
            return this.bindingTree;
        }
        var properties = path.split(".");
        var parentBinding = this.bindingTree;
        var traversedPath = "";
        for (var i = 0; i < properties.length; i++) {
            if (i > 0) {
                traversedPath += ".";
            }
            traversedPath += properties[i];
            if (parentBinding.childBindings[properties[i]]) {
                parentBinding = parentBinding.childBindings[properties[i]];
            }
            else {
                var bindingInfo = new DataBinding(traversedPath, this);
                parentBinding.childBindings[properties[i]] = bindingInfo;
                parentBinding = bindingInfo;
            }
        }
        return parentBinding;
    };
    /**
     * Unsubscribes update callbacks for all bindings and removes them from the binding catalog.
     */
    DataBinder.prototype.removeAllBindings = function (binding) {
        var currentBinding;
        if (binding) {
            currentBinding = binding;
        }
        else {
            currentBinding = this.bindingTree;
        }
        for (var childBinding in currentBinding.childBindings) {
            if (currentBinding.childBindings.hasOwnProperty(childBinding)) {
                this.removeAllBindings(currentBinding.childBindings[childBinding]);
                delete currentBinding.childBindings[childBinding];
            }
        }
        currentBinding.detachBinding();
        currentBinding.releaseListeners();
    };
    /**
     * Resolves a property path string to the actual Observable property.
     * @param {string} path The property path to resolve
     * @returns {Observable<any>} The Observable Property
     */
    DataBinder.resolvePropertyPath = function (path, dataContext) {
        var currentDataContext = dataContext;
        if (path === "") {
            return currentDataContext;
        }
        var properties = path.split(".");
        for (var i = 0; i < properties.length; i++) {
            if (currentDataContext.value[properties[i]]) {
                currentDataContext = currentDataContext.value[properties[i]];
            }
            else {
                console.warn("Attempted to resolve non-existent property path: '" + path + "'.");
                return null;
            }
        }
        return currentDataContext;
    };
    /**
     * The regular expression used to detect bindings in templates.
     */
    DataBinder.bindingRegex = /{{[a-zA-Z._0-9]+}}/g;
    return DataBinder;
}());
/**
 * A class to maintain information on a data-bound property.
 * Used to construct a dependency tree of bindings.
 * TODO: Release old events and re-bind when data context changes.
 */
var DataBinding = (function () {
    /**
     * Initializes the DataBinding class given a path to the property and a matching data context.
     * @param {string} path The property path to bind
     * @param {Observable<any>} The data context to bind against
     */
    function DataBinding(path, dataBinder) {
        var _this = this;
        this.dataBinder = dataBinder;
        this.path = path;
        this.childBindings = {};
        if (path.indexOf(".") >= 0) {
            this.property = path.substr(path.lastIndexOf(".") + 1);
        }
        else {
            this.property = path;
        }
        this.onValueChanged = new EventHandler();
        this.updateCallback = function (args) {
            _this.onValueChanged.fire({ path: _this.path, binding: _this, valueChangedEvent: args });
            _this.reattachChildren();
        };
        this.attachBinding();
    }
    Object.defineProperty(DataBinding.prototype, "value", {
        /**
         * The value of the property itself.
         */
        get: function () {
            return DataBinder.resolvePropertyPath(this.path, this.dataBinder.dataContext).value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataBinding.prototype, "observableValue", {
        /**
         * The Observable instance encapsulating the target property.
         */
        get: function () {
            return DataBinder.resolvePropertyPath(this.path, this.dataBinder.dataContext);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Forces child (dependent) bindings to re-attach their bindings.
     * @param {DataBinding?} binding Optionally specify a starting Binding to traverse from
     * @param {IObservable?} detachFrom Optionally specify a data context to detach from
     */
    DataBinding.prototype.reattachChildren = function (binding, detachFrom) {
        if (!binding) {
            binding = this;
        }
        for (var c in binding.childBindings) {
            if (binding.childBindings.hasOwnProperty(c)) {
                binding.childBindings[c].reattachBinding(detachFrom);
                this.reattachChildren(binding.childBindings[c], detachFrom);
            }
        }
    };
    /**
     * Detaches and re-attaches to target property.
     * Useful if parent properties or data context changes.
     * @param {IObservable} Optionally specify a data context to detach from
     */
    DataBinding.prototype.reattachBinding = function (detachFrom) {
        this.detachBinding(detachFrom);
        this.attachBinding();
    };
    /**
     * Attaches binding to the target property.
     */
    DataBinding.prototype.attachBinding = function () {
        var prop = DataBinder.resolvePropertyPath(this.path, this.dataBinder.dataContext);
        if (prop) {
            prop.onValueChanged.subscribe(this.updateCallback);
            this.onValueChanged.fire({ path: this.path, binding: this, valueChangedEvent: { oldValue: null, newValue: prop.value } });
        }
    };
    /**
     * Detaches binding from the target property.
     * @param {Observable<any>?} dataContext Optionally specify a data context to detach from
     */
    DataBinding.prototype.detachBinding = function (detachFrom) {
        var prop;
        if (detachFrom) {
            prop = DataBinder.resolvePropertyPath(this.path, detachFrom);
        }
        else {
            prop = DataBinder.resolvePropertyPath(this.path, this.dataBinder.dataContext);
        }
        if (prop) {
            prop.onValueChanged.unSubscribe(this.updateCallback);
        }
    };
    /**
     * Unsubscribes all listeners from onChanged event handler.
     */
    DataBinding.prototype.releaseListeners = function () {
        this.onValueChanged.unSubscribeAll();
    };
    return DataBinding;
}());
/**
 * Event class to communicate when data bindings have updated.
 */
var DataBindingValueChangedEvent = (function () {
    function DataBindingValueChangedEvent() {
    }
    return DataBindingValueChangedEvent;
}());
/**
 * A class to store information on node bindings in the DOM.
 */
var NodeBinding = (function () {
    /**
     * @param {Node} node The node
     * @param {DataBinding[]} bindings Data Bindings associated with this node
     */
    function NodeBinding(node, bindings) {
        var _this = this;
        this.node = node;
        this.originalValue = this.node.nodeValue;
        this.bindings = bindings;
        this.updateCallback = function (args) {
            _this.updateNode();
        };
        for (var i = 0; i < this.bindings.length; i++) {
            this.bindings[i].onValueChanged.subscribe(this.updateCallback);
        }
        this.updateNode();
    }
    /**
     * Updates node with values from data bindings.
     */
    NodeBinding.prototype.updateNode = function () {
        var newValue = this.originalValue;
        for (var i = 0; i < this.bindings.length; i++) {
            newValue = newValue.replace("{{" + this.bindings[i].path + "}}", this.bindings[i].value);
        }
        this.node.nodeValue = newValue;
    };
    return NodeBinding;
}());
var httpMethod;
(function (httpMethod) {
    httpMethod[httpMethod["GET"] = 0] = "GET";
    httpMethod[httpMethod["POST"] = 1] = "POST";
})(httpMethod || (httpMethod = {}));
;
/**
 * This class exists to provide an easy way to make HTTP requests
 * And get JSON objects in response.
 */
var JsonRequest = (function () {
    function JsonRequest() {
    }
    /**
     * Internal method to send an http request to some URL and
     * return a JSON object via a Promise.
     *
     * @param url The URL to send the request to
     * @param httpMethod HTTP method used in request
     * @param postData POST data to send, if the method used is post
     * @param authorization string Authorization header information
     */
    JsonRequest.httpRequest = function (url, method, postData, authorization) {
        // I promise I'll do this. Pinky swear.
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            switch (method) {
                case httpMethod.GET:
                    req.open("GET", url);
                    break;
                case httpMethod.POST:
                    req.open("POST", url);
                    break;
            }
            if (typeof authorization !== "undefined") {
                req.setRequestHeader("Authorization", authorization);
            }
            req.onload = function () {
                // This is called even on 404 etc
                // so check the status
                if (req.status === 200) {
                    // Resolve the promise with the response text
                    var result = JSON.parse(req.responseText);
                    var tResult = result;
                    resolve(tResult);
                }
                else {
                    // Otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject(Error(req.statusText));
                }
            };
            // Handle network errors
            req.onerror = function () {
                reject(Error("Network Error"));
            };
            // Make the request
            switch (method) {
                case httpMethod.GET:
                    req.send();
                    break;
                case httpMethod.POST:
                    req.send(postData);
                    break;
            }
        });
    };
    /**
     * A method to perform a GET HTTP request and parse resulting JSON
     *
     * @param url URL to request
     * @param authorization Authorization header
     */
    JsonRequest.httpGet = function (url, authorization) {
        return JsonRequest.httpRequest(url, httpMethod.GET, null, authorization);
    };
    /**
     * A method to perform a POST HTTP request and parse resulting JSON
     *
     * @param url URL to request
     * @param postData JSON post data to send
     * @param authorization Authorization header
     */
    JsonRequest.httpPost = function (url, postData, authorization) {
        return JsonRequest.httpRequest(url, httpMethod.POST, postData, authorization);
    };
    return JsonRequest;
}());
/// <reference path="IObservable.ts" />
/**
 * A simple value store that notifies any subscribers of changes to its value.
 */
var Observable = (function () {
    function Observable(defaultValue) {
        this._onValueChanged = new EventHandler();
        this._value = defaultValue;
    }
    Object.defineProperty(Observable.prototype, "value", {
        /* tslint:enable:variable-name */
        get: function () {
            return this._value;
        },
        set: function (newVal) {
            if (this._value !== newVal) {
                var oldVal = this._value;
                this._value = newVal;
                this._onValueChanged.fire({ oldValue: oldVal, newValue: newVal });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Observable.prototype, "onValueChanged", {
        /* tslint:enable:variable-name */
        get: function () {
            return this._onValueChanged;
        },
        enumerable: true,
        configurable: true
    });
    return Observable;
}());
var ObservableArray = (function () {
    /**
     * An array that fires events when items are added or removed.
     * @constructor
     */
    function ObservableArray() {
        this.itemStore = new Array();
        this.itemAdded = new EventHandler();
        this.itemRemoved = new EventHandler();
    }
    Object.defineProperty(ObservableArray.prototype, "size", {
        /**
         * Property that returns the size of the array
         */
        get: function () {
            return this.itemStore.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an item to the end of the array
     * @param {T} item The item to add
     */
    ObservableArray.prototype.push = function (item) {
        this.itemStore.push(item);
        this.itemAdded.fire({ item: item, position: this.itemStore.length - 1 });
    };
    /**
     * Inserts at item at the specified position (0 = start)
     * @param {T} item The item to insert
     * @param {number} index The index to insert at
     */
    ObservableArray.prototype.insert = function (item, index) {
        this.itemStore.splice(index, 0, item);
        this.itemAdded.fire({ item: item, position: index });
    };
    /**
     * Gets an item from the array at the specified index
     * @param {number} index - The index to fetch the item at
     */
    ObservableArray.prototype.get = function (index) {
        return this.itemStore[index];
    };
    /**
     * Removes a specified item from the array
     * @param {T} item - The item to remove from the array
     */
    ObservableArray.prototype.remove = function (item) {
        var index = this.itemStore.indexOf(item);
        if (index < 0) {
            throw "Item not found in array";
        }
        this.itemStore.splice(index, 1);
        this.itemRemoved.fire({ item: item, position: index });
    };
    /**
     * Removes the item at the specified index
     * @param {number} index - the index at which to remove the item
     */
    ObservableArray.prototype.removeAt = function (index) {
        if (index > this.size - 1) {
            throw "Index outside of array bounds.";
        }
        var item = this.itemStore[index];
        this.itemStore.splice(index, 1);
        this.itemRemoved.fire({ item: item, position: index });
    };
    /**
     * Retrieves the index of the specified item in the array
     * @returns {number} - The index of the specified item, or -1
     */
    ObservableArray.prototype.indexOf = function (item) {
        return this.itemStore.indexOf(item);
    };
    return ObservableArray;
}());
/// <reference path="IObservable.ts" />
/**
 * An ObservableProxy routes Observable properties through conversion functions to modify the value.
 */
var ObservableProxy = (function () {
    /**
     * Construct a new ObservableProxy on top of the given Observable with specified conversion functions.
     * @param {IObservable} source The source Observable
     * @prarm {Function} outgoing The function used to convert values from the source type to own type
     * @param {Function} incoming The function used to convert values from own type to source type
     */
    function ObservableProxy(source, outgoing, incoming) {
        var _this = this;
        this.source = source;
        this.outgoing = outgoing;
        this.incoming = incoming;
        this.onValueChanged = new EventHandler();
        // Bind value changed of source Observable
        this.source.onValueChanged.subscribe(function (arg) {
            _this.onValueChanged.fire({ oldValue: _this.outgoing(arg.oldValue), newValue: _this.outgoing(arg.newValue) });
        });
    }
    Object.defineProperty(ObservableProxy.prototype, "value", {
        /**
         * Retrieves the value by running the appropriate conversion on the source Observable's value.
         */
        get: function () {
            return this.outgoing(this.source.value);
        },
        set: function (val) {
            this.source.value = this.incoming(val, this.source.value);
        },
        enumerable: true,
        configurable: true
    });
    return ObservableProxy;
}());
//# sourceMappingURL=boink.js.map