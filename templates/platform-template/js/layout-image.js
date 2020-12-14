import { html, render } from "https://unpkg.com/lit-html@1.0.0/lit-html.js";

export class DropdownMenu extends HTMLElement {
    constructor() {
        super();

        this.render();
    }

    saveAsTemplate = async () => {
        const name = this.querySelector(".template-name").value;

        this.toggleVisibility();
        return;
    };

    hideElement = () => {
        this.classList.add("hidden");
    };

    showElement = () => {
        this.classList.remove("hidden");
    };

    toggleVisibility = () => {
        this.classList.toggle("hidden");
        document.querySelector("#layout-container").classList.toggle("hidden");
    };

    cancel = () => {
        this.toggleVisibility();
    };

    render = () => {
        const dropdownMenu = html` <div class="center-form">
            <fieldset>
                <legend>
                    Save the current Views in this Window as a Layout template
                </legend>
                <button @click=${this.saveAsTemplate}>Save Layout</button>
                <button @click=${this.cancel}>Cancel</button>
            </fieldset>
        </div>`;
        return render(dropdownMenu, this);
    };
}

customElements.define("dropdown-menu", DropdownMenu);
