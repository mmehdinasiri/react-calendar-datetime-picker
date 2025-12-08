/**
 * Content definitions for API Reference sections.
 * Used to render section descriptions and introductions.
 */

export const apiReferenceContent = {
  Components: {
    intro:
      'Both `DtCalendar` and `DtPicker` share most of their API. The props are organized into shared props (available in both components) and component-specific props.',
    details: [
      {
        title: 'Shared Props',
        content: `These props are available in both \`DtCalendar\` and \`DtPicker\`:`
      },
      {
        title: 'DtPicker Only',
        content: `These props are only available in \`DtPicker\`:`
      },
      {
        title: 'DtCalendar Only',
        content: `These props are only available in \`DtCalendar\`:`
      }
    ]
  },
  Types: {
    intro:
      'TypeScript type definitions for React Calendar DateTime Picker components, props, and utilities.',
    details: [
      {
        title: 'Type Definitions',
        content: `The following types are used throughout the library for type safety and better developer experience.`
      }
    ]
  }
}
