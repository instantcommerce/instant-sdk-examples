import cx from 'classnames';
import { AllHTMLAttributes, ElementType } from 'react';
import { paragraphSizeStyles } from './paragraphStyles';

type HTMLProperties = {
  as?: ElementType;
} & Omit<AllHTMLAttributes<HTMLElement>, 'color' | 'height' | 'width' | 'size'>;

type ParagraphProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  ellipsis?: boolean;
  uppercase?: boolean;
} & HTMLProperties;

export const Paragraph = ({
  as,
  children,
  className,
  ellipsis,
  size = 'md',
  uppercase,
  ...props
}: ParagraphProps) => {
  const Component = as || 'p';

  return (
    <Component
      className={cx(
        paragraphSizeStyles[size],
        uppercase ? 'uppercase tracking-wider' : '',
        ellipsis ? 'truncate' : '',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
