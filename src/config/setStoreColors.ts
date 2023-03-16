import { useTheme } from "@instantcommerce/sdk";

// fallback primary colors
const primaryColors = {
  s50: '#F5FAFF',
  s100: '#EFF8FF',
  s200: '#D1E9FF',
  s300: '#84CAFF',
  s400: '#53B1FD',
  s500: '#2E90FA',
  s600: '#1570EF',
  s700: '#175CD3',
  s800: '#1849A9',
  s900: '#0F2C60'
};

// fallback grayscale colors
const grayscaleColors = {
  s50: '#FAFAFA',
  s100: '#F4F4F5',
  s200: '#E4E4E7',
  s300: '#D4D4D8',
  s400: '#A1A1AA',
  s500: '#71717A',
  s600: '#52525B',
  s700: '#3F3F46',
  s800: '#27272A',
  s900: '#18181B',
};

export const setStoreColors = () => {
  const { colors } = useTheme();

  // remove `s` to match tailwind colors (e.g. s500 -> 500)
  const primaryObject = Object.fromEntries(
    Object.entries(colors?.primary || primaryColors).map(([k, o]) => [
      `--color-primary-${k.substring(1)}`,
      o
    ])
  );

  const grayscaleObject = Object.fromEntries(
    Object.entries(colors?.grayscale || grayscaleColors).map(([k, o]) => [
      `--color-gray-${k.substring(1)}`,
      o
    ])
  );

  return {
    '--color-white': '#fff',
    ...primaryObject,
    ...grayscaleObject,
    '--color-black': '#000',
  };
};
