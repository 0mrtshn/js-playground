export default class Console {
    #domElement;
    #consoleTabButton;
    #clearButtonElement;

    constructor() {
        this.#initDOMElements();
        this.#attachEvents();
    }

    #initDOMElements() {
        this.#domElement = document.getElementById('output');
        this.#clearButtonElement = document.getElementById(
            'clear-console-button'
        );
        this.#consoleTabButton = document.getElementById('console-tab-button');
    }

    #attachEvents() {
        window.addEventListener('message', (event) =>
            this.#handleMessage(event.data)
        );
        window.addEventListener('error', (error) => {
            this.#handleMessage(error);
        });
        this.#clearButtonElement.addEventListener('click', () => this.clear());
        this.#consoleTabButton.addEventListener('click', () => this.toggle());
    }

    #handleMessage(data) {
        switch (data.type) {
            case 'log':
                this.log(...data.data);
                break;

            case 'error':
                this.error(...data.data);
                break;
        }
    }

    clear() {
        this.#domElement.innerHTML = '';
    }

    log(data) {
        if (typeof data == 'object') data = JSON.stringify(data);
        this.#domElement.innerHTML += `<p class="log">${data}</p>`;
        this.#domElement.scrollTop = this.#domElement.scrollHeight;
    }

    error(...data) {
        this.#domElement.innerHTML += `<p class="error">${data[0]}</p>`;
        this.#domElement.scrollTop = this.#domElement.scrollHeight;
    }

    toggle() {
        this.#domElement.classList.toggle('hide');
    }

    expand() {
        this.#domElement.classList.remove('hide');
    }

    collapse() {
        this.#domElement.classList.add('hide');
    }
}
