import Editor from '@monaco-editor/react'

interface PropsEditorProps {
  value: string
  onChange: (value: string) => void
  onReset: () => void
  error: string | null
}

export const PropsEditor: React.FC<PropsEditorProps> = ({
  value,
  onChange,
  onReset,
  error
}) => {
  return (
    <div className='example-props'>
      <h3>Edit Props (JavaScript Object)</h3>
      <div className='props-editor-container'>
        <Editor
          height='400px'
          defaultLanguage='javascript'
          language='javascript'
          value={value}
          onChange={(val) => {
            if (val !== undefined) {
              onChange(val)
            }
          }}
          theme='vs-dark'
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: false, // Disable format on type to avoid issues
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto'
            },
            quickSuggestions: false,
            suggestOnTriggerCharacters: false,
            acceptSuggestionOnEnter: 'off',
            tabCompletion: 'off',
            wordBasedSuggestions: 'off'
          }}
          beforeMount={(monaco) => {
            // Disable JavaScript/TypeScript validation
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
              {
                noSemanticValidation: true,
                noSyntaxValidation: true,
                noSuggestionDiagnostics: true
              }
            )
          }}
          onMount={(editor) => {
            // Prevent editor from causing scroll
            editor.updateOptions({ readOnly: false })
          }}
        />
        {error && <div className='props-error'>{error}</div>}
      </div>
      <button className='props-reset-btn' onClick={onReset} type='button'>
        Reset to Default
      </button>
    </div>
  )
}
