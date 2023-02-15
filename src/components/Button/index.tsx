import { Link, LinkProps } from '@instantcommerce/sdk';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cx from 'classnames';
import { baseStyles, buttonSizeStyles, linkSizeStyles, variantStyles } from './buttonStyles';

type BaseProps = {
  variant?:
    | 'primary'
    | 'secondary'
    | 'gray'
    | 'link'
    | 'linkPrimary'
    | 'linkInverted'
    | 'unstyled';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};

type ElementProps =
  | LinkProps
  | DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >;

type ButtonProps = BaseProps & ElementProps;

export const Button = ({
  children,
  className,
  size,
  variant = 'unstyled',
  ...props
}: ButtonProps) => {
  let hasButtonStyles;

  if (['primary', 'secondary', 'gray'].includes(variant)) {
    hasButtonStyles = true;
  }

  const baseProps = {
    className: cx(
      variant !== 'unstyled' ? baseStyles : '',
      variantStyles[variant],
      hasButtonStyles
        ? buttonSizeStyles[size || 'md']
        : size
        ? linkSizeStyles[size]
        : '',
      className
    )
  };

  if ('to' in props) {
    return (
      // @ts-ignore
      <Link {...baseProps} to={props?.to}>
        {children}
      </Link>
    );
  }

  return (
    <button {...baseProps} {...props}>
      {children}
    </button>
  );
};
