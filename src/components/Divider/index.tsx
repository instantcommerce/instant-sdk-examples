import cx from 'classnames';
import { AllHTMLAttributes } from 'react';

type DividerProps = Pick<AllHTMLAttributes<HTMLElement>, 'className' | 'style'>;

export const Divider = ({ className, style }: DividerProps) => (
  <span
    className={cx(
      'divider block w-full h-[1px] bg-theme-border',
      className
    )}
    style={{ ...style }}
  />
);
