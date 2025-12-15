import CodeEditorOptions from './CodeEditorOptions.js';
import { setupCodeEditorThemes } from './CodeEditorThemes.js';

async function loadMonaco() {
    return new Promise((resolve, reject) => {
        if (window.monaco) {
            resolve(window.monaco);
            return;
        }

        if (typeof require === 'undefined') {
            reject(
                new Error(
                    `Monaco loader (loader.min.js) dependency is not included in the page.`
                )
            );
            return;
        }

        require.config({
            paths: {
                vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs',
            },
        });

        require(['vs/editor/editor.main'], (monaco) => {
            if (monaco) resolve(monaco);
            else reject(new Error(`Failed to load monaco editor module.`));
        });
    });
}
export default class CodeEditor {
    #app;
    #domHTMLElement;
    #domCSSElement;
    #domJSElement;
    #htmlButton;
    #cssButton;
    #jsButton;
    #playButton;
    #openProjectButton;
    #saveProjectButton;
    #downloadButton;
    #monaco;
    #htmlEditor;
    #cssEditor;
    #jsEditor;

    constructor(app) {
        this.#app = app;
        this.#initDOMElements();
        this.#initializeMonacoEditor();
    }

    async #initializeMonacoEditor() {
        try {
            this.#monaco = await loadMonaco();

            setupCodeEditorThemes(this.#monaco);

            emmetMonaco.emmetHTML(this.#monaco);
            emmetMonaco.emmetCSS(this.#monaco);

            this.#htmlEditor = this.#monaco.editor.create(
                this.#domHTMLElement,
                {
                    ...CodeEditorOptions,
                    language: 'html',
                }
            );
            this.#cssEditor = this.#monaco.editor.create(this.#domCSSElement, {
                ...CodeEditorOptions,
                language: 'css',
            });
            this.#jsEditor = this.#monaco.editor.create(this.#domJSElement, {
                ...CodeEditorOptions,
                language: 'javascript',
            });

            this.#htmlEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.Enter,
                this.#handlePlayButtonClick.bind(this)
            );
            this.#cssEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.Enter,
                this.#handlePlayButtonClick.bind(this)
            );
            this.#jsEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.Enter,
                this.#handlePlayButtonClick.bind(this)
            );

            this.#htmlEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.KeyO,
                () => this.#handleOpenProjectButtonClick()
            );
            this.#cssEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.KeyO,
                () => this.#handleOpenProjectButtonClick()
            );
            this.#jsEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.KeyO,
                () => this.#handleOpenProjectButtonClick()
            );

            this.#htmlEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.KeyS,
                () => this.#handleSaveProjectButtonClick()
            );
            this.#cssEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.KeyS,
                () => this.#handleSaveProjectButtonClick()
            );
            this.#jsEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.KeyS,
                () => this.#handleSaveProjectButtonClick()
            );

            this.#htmlEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.KeyE,
                () => this.#handleDownloadButtonClick()
            );
            this.#cssEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.KeyE,
                () => this.#handleDownloadButtonClick()
            );
            this.#jsEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.KeyE,
                () => this.#handleDownloadButtonClick()
            );

            this.#htmlEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.Digit1,
                () => this.setActiveTab('html')
            );
            this.#htmlEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.Numpad1,
                () => this.setActiveTab('html')
            );
            this.#htmlEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.Digit2,
                () => this.setActiveTab('css')
            );
            this.#htmlEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.Numpad2,
                () => this.setActiveTab('css')
            );
            this.#htmlEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.Digit3,
                () => this.setActiveTab('js')
            );
            this.#htmlEditor.addCommand(
                this.#monaco.KeyMod.CtrlCmd | this.#monaco.KeyCode.Numpad3,
                () => this.setActiveTab('js')
            );

            this.#attachEventListeners();
            this.#load();
            this.#handlePlayButtonClick();
            this.#htmlEditor.focus();
        } catch (error) {
            console.error(`Editor initialization failed:`, error.message);
        }
    }

    #initDOMElements() {
        this.#domHTMLElement = document.getElementById('html-editor');
        this.#domCSSElement = document.getElementById('css-editor');
        this.#domJSElement = document.getElementById('js-editor');
        this.#htmlButton = document.getElementById('html-button');
        this.#cssButton = document.getElementById('css-button');
        this.#jsButton = document.getElementById('js-button');
        this.#playButton = document.getElementById('play-button');
        this.#openProjectButton = document.getElementById(
            'open-project-button'
        );
        this.#saveProjectButton = document.getElementById(
            'save-project-button'
        );
        this.#downloadButton = document.getElementById('download-button');
    }

    #attachEventListeners() {
        this.#htmlButton.addEventListener(
            'click',
            this.#handleHTMLButtonClick.bind(this)
        );
        this.#cssButton.addEventListener(
            'click',
            this.#handleCSSButtonClick.bind(this)
        );
        this.#jsButton.addEventListener(
            'click',
            this.#handleJSButtonClick.bind(this)
        );
        this.#playButton.addEventListener(
            'click',
            this.#handlePlayButtonClick.bind(this)
        );
        this.#openProjectButton.addEventListener(
            'click',
            this.#handleOpenProjectButtonClick.bind(this)
        );
        this.#saveProjectButton.addEventListener(
            'click',
            this.#handleSaveProjectButtonClick.bind(this)
        );
        this.#downloadButton.addEventListener(
            'click',
            this.#handleDownloadButtonClick.bind(this)
        );

        this.#htmlEditor.onDidChangeModelContent(() => {
            const title = this.getHTMLValue().match(/<title>([^<]+)<\/title>/);
            if (title) this.#app.setProjectTitle(title[1]);
            else this.#app.setProjectTitle('Untitled');
            this.#save();
        });
        this.#cssEditor.onDidChangeModelContent(() => this.#save());
        this.#jsEditor.onDidChangeModelContent(() => this.#save());
    }

    #load() {
        let data = localStorage.getItem('__Quickly_Cache__');
        if (!data) data = { html: '', css: '', js: '' };
        data = JSON.parse(data);
        this.setHTMLValue(data.html);
        this.setCSSValue(data.css);
        this.setJSValue(data.js);
    }

    #save() {
        const data = {
            html: this.getHTMLValue(),
            css: this.getCSSValue(),
            js: this.getJSValue(),
        };
        localStorage.setItem('__Quickly_Cache__', JSON.stringify(data));
    }

    #handleHTMLButtonClick() {
        this.#htmlButton.classList.add('active');
        this.#domHTMLElement.classList.remove('hide');

        this.#cssButton.classList.remove('active');
        this.#domCSSElement.classList.add('hide');

        this.#jsButton.classList.remove('active');
        this.#domJSElement.classList.add('hide');

        this.#htmlEditor.focus();
    }

    #handleCSSButtonClick() {
        this.#htmlButton.classList.remove('active');
        this.#domHTMLElement.classList.add('hide');

        this.#cssButton.classList.add('active');
        this.#domCSSElement.classList.remove('hide');

        this.#jsButton.classList.remove('active');
        this.#domJSElement.classList.add('hide');

        this.#cssEditor.focus();
    }

    #handleJSButtonClick() {
        this.#htmlButton.classList.remove('active');
        this.#domHTMLElement.classList.add('hide');

        this.#cssButton.classList.remove('active');
        this.#domCSSElement.classList.add('hide');

        this.#jsButton.classList.add('active');
        this.#domJSElement.classList.remove('hide');

        this.#jsEditor.focus();
    }

    #handlePlayButtonClick() {
        const blob = this.getContentBlob();
        this.#app.getConsole().clear();
        this.#app.getPreview().loadBlob(blob);
    }

    #handleOpenProjectButtonClick() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.addEventListener('change', () => {
            console.log('a');
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const { html, css, js } = JSON.parse(reader.result);
                this.setHTMLValue(html);
                this.setCSSValue(css);
                this.setJSValue(js);
                this.setActiveTab('html');
                this.#handlePlayButtonClick();
            });
            reader.readAsText(fileInput.files[0]);
        });
        fileInput.click();
    }

    #handleSaveProjectButtonClick() {
        const jsonContent = JSON.stringify({
            html: this.getHTMLValue(),
            css: this.getCSSValue(),
            js: this.getJSValue(),
        });

        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${this.#app.getProjectTitle()}.json`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }

    #handleDownloadButtonClick() {
        const blob = this.getContentBlob();
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.download = `${this.#app.getProjectTitle()}.html`;
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
    }

    getContentBlob() {
        const code = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${this.#app.getProjectTitle()}</title>\n    <style>body{background-color: #1d212b;color:#f0f1f5;}${this.getCSSValue()}</style>\n</head>\n<body>\n    ${this.getHTMLValue().replace(
            /<title>[^<]*<\/title>/,
            ''
        )}\n    <script>const __log = console.log;\nconst __error = console.error;\n\nconsole.log = function (...data) {\n    window.parent.postMessage({ type: 'log', data });\n    __log(...data);\n};\n\nconsole.error = function (...data) {\n    window.parent.postMessage({ type: 'error', data });\n    __error(...data);\n};\n\ntry {\n    ${this.getJSValue()}\n} catch (error) {\n    console.error(error);\n}</script>\n</body>\n</html>`;
        return new Blob([code], { type: 'text/html' });
    }

    getHTMLValue() {
        return this.#htmlEditor.getValue();
    }

    setHTMLValue(value) {
        this.#htmlEditor.setValue(value);
    }

    getCSSValue() {
        return this.#cssEditor.getValue();
    }

    setCSSValue(value) {
        this.#cssEditor.setValue(value);
    }

    getJSValue() {
        return this.#jsEditor.getValue();
    }

    setJSValue(value) {
        this.#jsEditor.setValue(value);
    }

    setActiveTab(lang) {
        switch (lang) {
            case 'html':
                this.#handleHTMLButtonClick();
                this.#htmlEditor.focus();
                break;

            case 'css':
                this.#handleCSSButtonClick();
                this.#cssEditor.focus();
                break;

            case 'js':
                this.#handleJSButtonClick();
                this.#jsEditor.focus();
                break;
        }
    }

    runProject() {
        this.#handlePlayButtonClick();
    }

    saveProject() {
        this.#handleSaveProjectButtonClick();
    }
}
