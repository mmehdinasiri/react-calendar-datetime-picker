import React from 'react'
import Editor from '@monaco-editor/react'

interface UtilityExamplesDisplayProps {
  code: string
}

export const UtilityExamplesDisplay: React.FC<UtilityExamplesDisplayProps> = ({
  code
}) => {
  return (
    <div className='example-props'>
      <h3>Utility Function Examples (JavaScript Object)</h3>
      <div className='props-editor-container'>
        <Editor
          height='400px'
          defaultLanguage='javascript'
          language='javascript'
          value={code}
          theme='vs-dark'
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            readOnly: true,
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
        />
      </div>
    </div>
  )
}
