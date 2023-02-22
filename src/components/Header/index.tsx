import { LinkProps } from '@instantcommerce/sdk';
import cx from 'classnames';
import { AllHTMLAttributes, ReactNode } from 'react';
import { Button, ButtonProps, Divider, Paragraph, Title } from '..';

type HeaderProps = {
  // content
  buttonText?: LinkProps['children'];
  buttonLink?: LinkProps['to'];
  pretitle?: string | ReactNode | null;
  subtitle?: string | ReactNode | null;
  title?: string | ReactNode | null;
  // customizations
  alignment?: 'left' | 'center';
  buttonLocation?: 'top' | 'bottom';
  buttonType: ButtonProps['variant'];
  buttonCorners?: ButtonProps['corners'];
  buttonWeight?: ButtonProps['weight'];
  hasDivider?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  //overrides
  pretitleColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  dividerColor?: string;
} & Pick<AllHTMLAttributes<HTMLElement>, 'className' | 'style' | 'children'>;

export type HeaderPropswithSDKSchema = {
  buttons?: {
    value: {
      text: string;
      link: {
        type: 'link';
        description?: string;
        isRequired?: boolean;
        isTranslatable?: boolean;
        label?: string;
        preview?: string;
      };
    };
  }[];
  headerAlignment: HeaderProps['alignment'];
  headerSize: HeaderProps['size'];
} & Omit<HeaderProps, 'alignment' | 'buttonLink' | 'buttonText' | 'size'>;

export const Header = ({
  alignment,
  buttonLink,
  buttonLocation,
  buttonType,
  buttonText,
  buttonCorners,
  buttonWeight,
  className,
  children,
  dividerColor,
  hasDivider,
  pretitle,
  pretitleColor,
  size,
  style,
  subtitle,
  subtitleColor,
  title,
  titleColor
}: HeaderProps) => {
  const button = (
    <Button
      variant={buttonType}
      corners={buttonCorners}
      weight={buttonWeight}
      size={size === 'md' ? 'sm' : 'md'}
      className={cx(
        `header__button whitespace-normal max-w-xs`,
        !!subtitle ? 'order-3' : 'order-2',
        !!subtitle
          ? alignment === 'center' || buttonLocation === 'bottom'
            ? 'mt-3 md:mt-4'
            : 'mt-3 md:mt-0 md:ml-auto'
          : alignment === 'center' || buttonLocation === 'bottom'
          ? 'mt-1.5 md:mt-1.5'
          : 'mt-1.5 md:mt-0 md:ml-auto',
        alignment === 'center'
          ? 'text-center self-center'
          : buttonLocation === 'top'
          ? 'text-right'
          : 'text-left self-start'
      )}
      to={buttonLink}
    >
      {buttonText}
    </Button>
  );

  return (
    <>
      <div
        className={cx(
          'header w-full',
          alignment === 'center' ? 'text-center' : 'text-left',
          !!pretitle || !!title || !!subtitle ? 'mb-4 md:mb-5' : 'mb-0',
          className
        )}
        style={{ ...style }}
      >
        {!!pretitle && (
          <Paragraph
            as="h3"
            size="sm"
            className={cx(
              'header__pretitle text-theme-pretitle mb-1.5 font-medium'
            )}
            style={!!pretitleColor ? { color: pretitleColor } : {}}
          >
            {pretitle}
          </Paragraph>
        )}

        {!!title && (
          <div
            className={cx(
              'header__title-wrapper flex w-full flex-col md:items-center',
              alignment === 'center'
                ? 'items-center md:flex-col'
                : 'items-start md:flex-row'
            )}
          >
            <Title
              as="h2"
              variant={size === 'lg' || size === 'xl' ? 'display' : 'heading'}
              size={
                size === 'lg' || size === 'xl'
                  ? size === 'lg'
                    ? 'sm'
                    : 'md'
                  : size
              }
              className={cx(
                'header__title text-theme-title max-w-xl flex-1 order-1',
                size === 'xl' ? 'font-bold' : 'font-medium'
              )}
              style={!!titleColor ? { color: titleColor } : {}}
            >
              {title}
            </Title>

            {buttonLocation === 'top' && buttonText && !subtitle && button}
          </div>
        )}

        {!!subtitle && (
          <div
            className={cx(
              'header__subtitle-wrapper flex w-full flex-col',
              alignment === 'center'
                ? 'items-center md:flex-col'
                : 'items-start md:flex-row',
              !!title ? (alignment === 'center' ? 'mt-1.5' : 'mt-1') : 'mt-0'
            )}
          >
            <Paragraph
              as="p"
              size={size === 'md' ? 'sm' : 'md'}
              className={cx(
                'header__subtitle text-theme-subtitle max-w-xl order-2 flex-1 pr-0',
                buttonText && alignment !== 'center' ? 'md:pr-4' : 'md:pr-0'
              )}
              style={!!subtitleColor ? { color: subtitleColor } : {}}
            >
              {subtitle}
            </Paragraph>

            {buttonLocation === 'top' && buttonText && button}
          </div>
        )}

        {hasDivider && (title || subtitle) && (
          <Divider
            className="header__divider mt-3 md:mt-4"
            style={!!dividerColor ? { backgroundColor: dividerColor } : {}}
          />
        )}
      </div>

      {children}

      {buttonLocation === 'bottom' && buttonText && button}
    </>
  );
};
