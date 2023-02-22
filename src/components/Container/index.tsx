import cx from 'classnames';
import { AllHTMLAttributes } from 'react';

import { HeaderPropswithSDKSchema, Header } from '..';
import { themeTypes } from '../../config';

type ContainerProps = {
  headerProps?: HeaderPropswithSDKSchema;
  backgroundColor?: string;
  innerClassName?: string;
  innerStyle?: any;
  style?: any;
  theme?: themeTypes;
} & Pick<AllHTMLAttributes<HTMLElement>, 'className' | 'children'>;

export const Container = ({
  backgroundColor,
  children,
  className,
  headerProps,
  innerClassName,
  innerStyle,
  style
}: ContainerProps) => (
  // feel free to overwrite the container layout with other classnames
  <section
    className={cx('section w-full bg-theme-bg', className)}
    style={{
      ...style,
      ...(!!backgroundColor ? { backgroundColor } : {})
    }}
  >
    <div
      className={cx(
        'section-inner flex flex-col max-w-7xl mx-auto py-9 px-2',
        innerClassName
      )}
      style={{ ...innerStyle }}
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
