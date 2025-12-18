/**
 * Content definitions for installation page.
 * Pure content data extracted from page markup.
 */

export const installationContent = {
  title: 'Installation',
  intro:
    'Install React Calendar DateTime Picker using your preferred package manager.',

  packageManagers: {
    title: 'Package Managers',
    description: 'Install the package using npm, yarn, or pnpm:',
    commands: {
      npm: 'npm install react-calendar-datetime-picker',
      yarn: 'yarn add react-calendar-datetime-picker',
      pnpm: 'pnpm add react-calendar-datetime-picker'
    }
  },

  importStyles: {
    title: 'Import Styles',
    description:
      'Import the CSS file to ensure the calendar displays correctly. You can import it in your main entry file or component:',
    code: "import 'react-calendar-datetime-picker/dist/style.css'",
    note: {
      title: 'Note:',
      content:
        "If you're using a bundler that supports CSS imports, you can also import the styles directly in your component files."
    }
  },

  nextSteps: [
    {
      href: '/understanding-date-values',
      text: 'Understand date values',
      description: 'and how dates are structured'
    },
    {
      href: '/getting-started',
      text: 'Read the Quick Start guide',
      description: 'to learn basic usage'
    },
    {
      href: '/types',
      text: 'Learn about data types',
      description: 'and their structures'
    },
    {
      href: '/examples',
      text: 'View interactive examples',
      description: 'to see the component in action'
    }
  ]
}
