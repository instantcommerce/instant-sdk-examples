export const baseStyles = 'relative flex flex-row justify-center items-center text-center font-medium whitespace-no-wrap overflow-hidden';

export const variantStyles = {
  primary:
    'bg-primary-500 border-primary-500 text-white hover:bg-primary-700 hover:border-primary-700 focus:shadow-[0px_0px_0px_4px_var(--color-primary-200)] disabled:bg-primary-200 disabled:border-primary-200',
  secondary:
    'bg-white border-primary-100 text-primary-600 hover:bg-primary-200 hover:border-primary-200 focus:shadow-[0px_0px_0px_4px_var(--color-primary-200)] disabled:bg-primary-50 disabled:border-primary-50',
  gray: 'bg-white border-gray-300 text-gray-700 hover:bg-primary-50 focus:shadow-[0px_0px_0px_4px_var(--color-primary-100)] disabled:bg-gray-200 disabled:border-gray-200',
  link: 'text-gray-700 hover:text-gray-500 focus:text-gray-500 disabled:text-gray-300',
  linkPrimary:
    'text-primary-600 hover:text-primary-700 focus:text-primary-700 disabled:text-gray-300',
  linkInverted:
    'text-white hover:text-gray-200 focus:text-gray-200 disabled:text-gray-200',
  unstyled: ''
};

export const buttonSizeStyles = {
  sm: 'h-[36px] px-1.75 text-sm',
  md: 'h-5 px-2 text-sm',
  lg: 'h-6 px-2.5 text-base',
  xl: 'h-[52px] px-3 text-base',
  '2xl': 'h-7 px-4 text-base'
};

export const linkSizeStyles = {
  sm: 'text-sm leading-roomy',
  md: 'text-base leading-loose',
  lg: 'text-lg leading-wide',
  xl: 'text-xl tracking-tight leading-roomy',
  '2xl': 'text-xl -tracking-tight leading-roomy'
};
