import cx from 'classnames';
import { AllHTMLAttributes } from 'react';

type OverlayProps = {
  color: string;
  opacity: number;
} & Pick<AllHTMLAttributes<HTMLElement>, 'className' | 'style'>;

export const Overlay = ({ color, className, opacity, style }: OverlayProps) => (
  <span
    className={cx('absolute top-0 bottom-0 right-0 left-0', className)}
    style={{ background: color, opacity: `${opacity}%`, ...style }}
  />
);
