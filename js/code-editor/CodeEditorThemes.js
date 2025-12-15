export const CodeEditorThemes = {
    POIMANDRES_DARK: 'poimandres-dark',
};

const POIMANDRES_DARK_THEME = {
    base: 'vs-dark',
    inherit: true,
    rules: [
        {
            token: 'comment',
            foreground: '767c9dB0',
            fontStyle: 'italic',
        },
        { token: 'keyword', foreground: 'd491d5' },
        { token: 'string', foreground: 'A6CDB4' },
        { token: 'delimiter', foreground: 'a9b1d6' },
        { token: 'tag', foreground: 'f7768e' },
        { token: 'attribute.name', foreground: '7aa2f7' },
        { token: 'attribute.value', foreground: '9ece6a' },
        { token: 'number', foreground: 'fab763' },
        { token: 'type', foreground: '73d6d6' },
        { token: 'identifier', foreground: 'e2e4e9' },
    ],
    colors: {
        'editor.background': '#1f242e',
        'editor.foreground': '#f0f1f5',
        'editor.lineHighlightBackground': '#29303d',
        'editor.selectionBackground': '#29303d',
        'editorCursor.foreground': '#f0f1f5',
        'editorLineNumber.foreground': '#a3adc2',
        'editorLineNumber.activeForeground': '#f0f1f5',
        'editorOverviewRuler.wordHighlightStrongForeground': '#0000',
        'editorOverviewRuler.addedForeground': '#0000',
        'editorOverviewRuler.border': '#0000',
        'editorOverviewRuler.bracketMatchForeground': '#0000',
        'editorOverviewRuler.deletedForeground': '#0000',
        'editorOverviewRuler.errorForeground': '#0000',
        'editorOverviewRuler.findMatchForeground': '#0000',
        'editorOverviewRuler.infoForeground': '#0000',
        'editorOverviewRuler.modifiedForeground': '#0000',
        'editorOverviewRuler.rangeHighlightForeground': '#0000',
        'editorOverviewRuler.selectionHighlightForeground': '#0000',
        'editorOverviewRuler.wordHighlightForeground': '#0000',
        'editorOverviewRuler.warningForeground': '#0000',

        'editorSuggestWidget.background': '#1d212b',
        'editorSuggestWidget.border': '#29303d',
        'editorSuggestWidget.foreground': '#a3adc2',
        'editorSuggestWidget.highlightForeground': '#f0f1f5',
        'editorSuggestWidget.selectedBackground': '#29303d',

        'editorHoverWidget.background': '#1d212b',
        'editorHoverWidget.border': '#29303d',
        'editorHoverWidget.foreground': '#a3adc2',
    },
};

export function setupCodeEditorThemes(monaco) {
    monaco.editor.defineTheme(
        CodeEditorThemes.POIMANDRES_DARK,
        POIMANDRES_DARK_THEME
    );
}
