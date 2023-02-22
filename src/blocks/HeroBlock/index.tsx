import { defineBlock, useBlockState } from '@instantcommerce/sdk';
import cx from 'classnames';

import { Button, Overlay, Paragraph, Title } from '../../components';
import { setThemeColors,  setBlockTheme } from '../../config';
import '../../styles/global.css';
import {
  heroVariantStyles,
  heroWidthStyles,
  heroHeightStyles,
  heroImageStyles,
  heroImageMobileStyles,
  heroVerticalStyles,
  heroHorizontalStyles
} from './heroStyles';

const HeroBlock = () => {
  const {
    content: { image, mobileImage, pretitle, title, subtitle, buttons },
    customizer: {
      theme,
      backgroundColor,
      overlayColor,
      overlayOpacity,
      variant,
      width,
      height,
      verticalAlign,
      horizontalAlign,
      pretitleSize,
      pretitleColor,
      titleSize,
      titleColor,
      subtitleSize,
      subtitleColor,
      firstButtonType,
      secondButtonType,
      buttonRadius,
      buttonWeight,
    }
  } = useBlockState();

  return (
    <section
      className={cx('relative w-full bg-theme-bg')}
      style={{
        ...setThemeColors(),
        ...setBlockTheme(theme),
        ...(!!backgroundColor ? { backgroundColor } : {})
      }}
    >
      <div
        className={cx(
          'hidden md:flex bg-cover absolute top-0 bottom-0',
          heroImageStyles[variant]
        )}
        style={{ backgroundImage: `url(${image?.filename})` }}
      >
        {overlayColor && (
          <Overlay color={overlayColor} opacity={overlayOpacity} />
        )}
      </div>
      <div
        className={cx(
          'flex w-full',
          heroVariantStyles[variant],
          heroWidthStyles[width],
          heroHeightStyles[height]
        )}
      >
        <div
          className={cx(
            'flex bg-cover md:!bg-none',
            heroImageMobileStyles[variant]
          )}
          style={{ backgroundImage: `url(${mobileImage?.filename})` }}
        >
          {overlayColor && (
            <Overlay
              className="md:hidden"
              color={overlayColor}
              opacity={overlayOpacity}
            />
          )}
        </div>
        <div
          className={cx(
            'flex flex-col px-2 py-6 md:py-100 z-10 sm:max-w-[50%] lg:max-w-[640px] md:flex-1',
            !(width === 'contained' && variant === 'cover') ? 'md:px-10' : '',
            heroVerticalStyles[verticalAlign],
            heroHorizontalStyles[horizontalAlign]
          )}
        >
          {pretitle && (
            <Paragraph
              className={cx('font-medium mb-1 text-theme-pretitle')}
              size={pretitleSize}
              style={!!pretitleColor ? { color: pretitleColor } : {}}
            >
              {pretitle}
            </Paragraph>
          )}

          {title && (
            <Title
              className={cx('font-medium text-theme-title')}
              size={titleSize}
              style={!!titleColor ? { color: titleColor } : {}}
              variant="display"
              as="h1"
            >
              {title}
            </Title>
          )}

          {subtitle && (
            <Paragraph
              className={cx('mb-2 text-theme-subtitle')}
              size={subtitleSize}
              style={!!subtitleColor ? { color: subtitleColor } : {}}
            >
              {subtitle}
            </Paragraph>
          )}

          {buttons && (
            <div
              className={cx('hero__buttons-wrapper flex flex-wrap gap-2 mt-4')}
            >
              {buttons?.[0]?.value?.text && (
                <Button
                  size={
                    ['link', 'linkPrimary', 'linkInverted'].includes(
                      firstButtonType
                    )
                      ? 'sm'
                      : 'md'
                  }
                  variant={firstButtonType}
                  to={buttons?.[0]?.value?.link}
                  className={cx(`rounded-${buttonRadius} font-${buttonWeight}`)}
                >
                  {buttons?.[0]?.value?.text}
                </Button>
              )}

              {buttons?.[1]?.value?.text && (
                <Button
                  size={
                    ['link', 'linkPrimary', 'linkInverted'].includes(
                      secondButtonType
                    )
                      ? 'sm'
                      : 'md'
                  }
                  variant={secondButtonType}
                  to={buttons?.[1]?.value?.link}
                  className={cx(`rounded-${buttonRadius} font-${buttonWeight}`)}
                >
                  {buttons?.[1]?.value?.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default defineBlock({
  component: HeroBlock,
  customizerSchema: {
    fields: {
      theme: {
        type: 'select',
        options: [
          { label: 'Light', value: 'themeLight' },
          { label: 'Gray', value: 'themeGray' },
          { label: 'Primary light', value: 'themePrimaryLight' },
          { label: 'Primary', value: 'themePrimary' },
          { label: 'Dark', value: 'themeDark' }
        ],
        preview: 'themeDark'
      },
      variant: {
        type: 'select',
        options: [
          { label: 'Cover', value: 'cover' },
          { label: 'Image text', value: 'imageText' },
          { label: 'Text image', value: 'textImage' }
        ],
        preview: 'cover'
      },
      overlayColor: {
        type: 'color',
        label: 'Image overlay color',
        preview: '#000'
      },
      overlayOpacity: {
        type: 'number',
        label: 'Image overlay opacity',
        min: 0,
        max: 100,
        preview: 10
      },
      width: {
        type: 'select',
        options: [
          { label: 'Boxed', value: 'contained' },
          { label: 'Full width', value: 'full' }
        ],
        preview: 'contained'
      },
      height: {
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' }
        ],
        preview: 'md'
      },
      horizontalAlign: {
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' }
        ],
        preview: 'left'
      },
      verticalAlign: {
        type: 'select',
        options: [
          { label: 'Top', value: 'top' },
          { label: 'Center', value: 'center' },
          { label: 'Bottom', value: 'bottom' }
        ],
        preview: 'center'
      },
      pretitleSize: {
        type: 'select',
        options: [
          { label: 'Small', value: 'md' },
          { label: 'Medium', value: 'lg' },
          { label: 'Large', value: 'xl' }
        ],
        preview: 'md'
      },
      titleSize: {
        type: 'select',
        options: [
          { label: 'Small', value: 'md' },
          { label: 'Medium', value: 'lg' },
          { label: 'Large', value: 'xl' }
        ],
        preview: 'lg'
      },
      subtitleSize: {
        type: 'select',
        options: [
          { label: 'Small', value: 'md' },
          { label: 'Medium', value: 'lg' },
          { label: 'Large', value: 'xl' }
        ],
        preview: 'lg'
      },
      pretitleColor: { type: 'color', label: 'Pretitle color' },
      titleColor: { type: 'color', label: 'Title color' },
      subtitleColor: { type: 'color', label: 'Description color' },
      backgroundColor: { type: 'color', label: 'Background color' },
      firstButtonType: {
        type: 'select',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Gray', value: 'gray' },
          { label: 'Link', value: 'link' },
          { label: 'Link primary', value: 'linkPrimary' },
          { label: 'Link inverted', value: 'linkInverted' }
        ],
        preview: 'primary'
      },
      secondButtonType: {
        type: 'select',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Gray', value: 'gray' },
          { label: 'Link', value: 'link' },
          { label: 'Link primary', value: 'linkPrimary' },
          { label: 'Link inverted', value: 'linkInverted' }
        ],
        preview: 'linkInverted'
      },
      buttonRadius: {
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Small', value: 'xs' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
          { label: 'Full', value: 'full' }
        ],
        preview: 'none'
      },
      buttonWeight: {
        type: 'select',
        options: [
          { label: 'Regular', value: 'base' },
          { label: 'Medium', value: 'medium' },
          { label: 'Bold', value: 'bold' },
        ],
        preview: 'medium'
      }
    }
  },
  contentSchema: {
    fields: {
      pretitle: {
        type: 'text',
        label: 'Pretitle',
        preview: 'Hero pretitle',
        isTranslatable: true
      },
      title: {
        type: 'text',
        label: 'Title',
        preview: 'Hero title',
        isTranslatable: true
      },
      subtitle: {
        type: 'text',
        label: 'Description',
        preview:
          'Hero subtitle dolor sit amet, consectetur adipiscing elit. Cras dui ligula, sollicitudin eu scelerisque non, ullamcorper sit amet massa. Aliquam et neque malesuada, tempus lorem gravida, rutrum urna.',
        isTranslatable: true
      },
      image: {
        type: 'image',
        preview:
          'https://images.unsplash.com/photo-1563693998336-93c10e5d8f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
      },
      mobileImage: {
        type: 'image',
        preview:
          'https://images.unsplash.com/photo-1563693998336-93c10e5d8f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
      },
      buttons: {
        type: 'subschema',
        allowed: ['button'],
        max: 3,
        preview: [
          {
            subschema: 'button',
            value: {
              text: 'Button text',
              link: 'https://a.storyblok.com/f/145828/5000x3333/564e281ca1/force-majeure-du8abwm5z2g-unsplash.jpg'
            }
          },
          {
            subschema: 'button',
            value: {
              text: 'Second button text',
              link: 'https://a.storyblok.com/f/145828/5000x3333/564e281ca1/force-majeure-du8abwm5z2g-unsplash.jpg'
            }
          }
        ]
      }
    },
    subschemas: {
      button: {
        fields: {
          text: {
            type: 'text',
            label: 'Text',
            isTranslatable: true,
            isRequired: true,
            maxLength: 40
          },
          link: {
            type: 'link',
            label: 'Link',
            isTranslatable: true,
            isRequired: true
          }
        }
      }
    }
  }
});
