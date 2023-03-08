import { AllHTMLAttributes } from "react";
import cx from "classnames";

type DividerProps = Pick<AllHTMLAttributes<HTMLElement>, "className" | "style">;

export const Divider = ({ className, style }: DividerProps) => (
  <span
    className={cx("divider block w-full h-[1px] bg-theme-border", className)}
    style={{ ...style }}
  />
);
