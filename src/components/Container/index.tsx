import { AllHTMLAttributes } from "react";
import cx from "classnames";

import { themeTypes } from "~/config";

import { HeaderPropswithSDKSchema, Header } from "..";

type ContainerProps = {
  headerProps?: HeaderPropswithSDKSchema;
  backgroundColor?: string;
  wrapperClassName?: string;
  wrapperStyle?: any;
  style?: any;
  theme?: themeTypes;
} & Pick<AllHTMLAttributes<HTMLElement>, "className" | "children">;

export const Container = ({
  backgroundColor,
  children,
  className,
  headerProps,
  style,
  wrapperClassName,
  wrapperStyle,
}: ContainerProps) => (
  // feel free to overwrite the container layout with other classnames
  <section
    className={cx("w-full bg-theme-bg", wrapperClassName)}
    style={{
      ...wrapperStyle,
      ...(!!backgroundColor ? { backgroundColor } : {}),
    }}
  >
    <div
      className={cx("flex flex-col w-full mx-auto py-[72px] px-4", className)}
      style={{ ...style }}
    >
      {!!headerProps?.pretitle ||
      !!headerProps?.title ||
      !!headerProps?.subtitle ? (
        <Header
          {...headerProps}
          alignment={headerProps?.headerAlignment}
          buttonLink={headerProps?.buttons?.[0]?.value?.link}
          buttonText={headerProps?.buttons?.[0]?.value?.text}
          size={headerProps?.headerSize}
        >
          {children}
        </Header>
      ) : (
        children
      )}
    </div>
  </section>
);
