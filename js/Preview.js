export default class Preview {
    #app;
    #domElement;

    constructor(app) {
        this.#app = app;
        this.#initDOMElements();
    }

    #initDOMElements() {
        this.#domElement = document.getElementById('preview');
    }

    loadBlob(blob) {
        const url = URL.createObjectURL(blob);
        this.#domElement.src = url;
        URL.revokeObjectURL(url);
    }
}
