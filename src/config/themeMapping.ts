export const themes = {
  themeLight: {
    bg: 'white',
    bgCard: 'white',
    bgContrast: 'gray-100',
    pretitle: 'gray-600',
    title: 'gray-900',
    subtitle: 'gray-600',
    icon: 'gray-800',
    highlightedText: 'gray-800',
    text: 'gray-500',
    border: 'gray-400',
    inactiveElement: 'gray-300',
    activeElement: 'gray-900',
    link: 'gray-900'
  },
  themeGray: {
    bg: 'gray-100',
    bgCard: 'white',
    bgContrast: 'gray-200',
    pretitle: 'gray-600',
    title: 'gray-900',
    subtitle: 'gray-600',
    icon: 'gray-800',
    highlightedText: 'gray-800',
    text: 'gray-600',
    border: 'gray-300',
    inactiveElement: 'gray-400',
    activeElement: 'gray-900',
    link: 'gray-900'
  },
  themePrimaryLight: {
    bg: 'primary-100',
    bgCard: 'white',
    bgContrast: 'primary-200',
    pretitle: 'primary-600',
    title: 'gray-900',
    subtitle: 'gray-600',
    icon: 'gray-800',
    highlightedText: 'gray-800',
    text: 'gray-500',
    border: 'primary-300',
    inactiveElement: 'gray-400',
    activeElement: 'primary-600',
    link: 'primary-600'
  },
  themePrimary: {
    bg: 'primary-700',
    bgCard: 'primary-600',
    bgContrast: 'primary-600',
    pretitle: 'primary-200',
    title: 'white',
    subtitle: 'gray-50',
    icon: 'gray-300',
    highlightedText: 'gray-300',
    text: 'gray-200',
    border: 'primary-500',
    inactiveElement: 'gray-300',
    activeElement: 'gray-50',
    link: 'gray-50'
  },
  themeDark: {
    bg: 'black',
    bgCard: 'gray-800',
    bgContrast: 'gray-800',
    pretitle: 'primary-300',
    title: 'white',
    subtitle: 'gray-50',
    icon: 'gray-300',
    highlightedText: 'gray-300',
    text: 'gray-400',
    border: 'gray-700',
    inactiveElement: 'gray-300',
    activeElement: 'gray-400',
    link: 'primary-400'
  }
};

export type themeTypes =
  | 'themeLight'
  | 'themeGray'
  | 'themePrimaryLight'
  | 'themePrimary'
  | 'themeDark';

export const setBlockTheme = (theme?: themeTypes) => {
  const themeObject = Object.fromEntries(
    Object.entries(themes[theme || 'themeLight']).map(([k, o]) => [
      `--color-${k}`,
      `var(--color-${o})`
    ])
  );

  return {
    ...themeObject
  };
};
