import { CodeEditorThemes } from './CodeEditorThemes.js';

const CodeEditorOptions = {
    automaticLayout: true,
    'bracketPairColorization.enabled': false,
    bracketPairColorization: { enabled: false },
    guides: { indentation: false },
    hideCursorInOverviewRuler: true,
    lineHeight: 2,
    minimap: { enabled: false },
    overviewRulerBorder: false,
    padding: { top: 16, bottom: 16 },
    renderLineHighlight: 'none',
    renderWhitespace: 'none',
    scrollbar: {
        horizontal: 'hidden',
        vertical: 'hidden',
        useShadows: false,
    },
    scrollBeyondLastLine: true,
    stickyScroll: { enabled: false },
    tabSize: 4,
    theme: CodeEditorThemes.POIMANDRES_DARK,
    wordWrap: 'on',
};

export default CodeEditorOptions;
