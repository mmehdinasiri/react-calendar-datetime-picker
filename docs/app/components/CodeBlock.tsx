'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language?: string
  code: string
  className?: string
  customStyle?: React.CSSProperties
}

export function CodeBlock({
  language = 'tsx',
  code,
  className = '',
  customStyle
}: CodeBlockProps) {
  const defaultStyle = {
    margin: 0,
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.5'
  }

  return (
    <div
      className={`rounded-lg overflow-hidden border border-border ${className}`}
    >
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={customStyle || defaultStyle}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
