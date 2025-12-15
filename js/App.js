import CodeEditor from './code-editor/CodeEditor.js';
import Preview from './Preview.js';
import Console from './Console.js';

export default class App {
    #codeEditor;
    #preview;
    #console;
    #newProjectButton;
    #toggleModeButton;
    #titleElement;

    constructor() {
        this.#codeEditor = new CodeEditor(this);
        this.#preview = new Preview(this);
        this.#console = new Console();
        this.#initDomElements();
        this.#attachEvents();
    }

    #initDomElements() {
        this.#titleElement = document.getElementById('title-span');
        this.#newProjectButton = document.getElementById('new-project-button');
        this.#toggleModeButton = document.getElementById('toggle-mode-button');
    }

    #attachEvents() {
        this.#toggleModeButton.addEventListener('click', () => {
            document.body.classList.toggle('minimalist');
        });
        this.#newProjectButton.addEventListener(
            'click',
            this.#handleNewProjectButtonClick.bind(this)
        );
    }

    #handleNewProjectButtonClick() {
        const editor = this.#codeEditor;
        const fullCodeLength =
            editor.getHTMLValue().trim().length +
            editor.getCSSValue().trim().length +
            editor.getJSValue().trim().length;

        if (
            fullCodeLength > 0 &&
            confirm(`Should the current project be saved?`)
        ) {
            this.getCodeEditor().saveProject();
        }

        this.#codeEditor.setHTMLValue('');
        this.#codeEditor.setCSSValue('');
        this.#codeEditor.setJSValue('');
        this.#console.expand();
        this.#codeEditor.setActiveTab('html');
        this.#codeEditor.runProject();
    }

    newProject() {
        this.#handleNewProjectButtonClick();
    }

    getCodeEditor() {
        return this.#codeEditor;
    }

    getPreview() {
        return this.#preview;
    }

    getConsole() {
        return this.#console;
    }

    getProjectTitle() {
        return this.#titleElement.textContent;
    }

    setProjectTitle(title) {
        this.#titleElement.textContent = title;
    }
}
