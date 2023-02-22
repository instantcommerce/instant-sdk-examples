import { defineBlock, useBlockState } from '@instantcommerce/sdk';

import { Container } from '../../components';
import { setThemeColors, setBlockTheme, themeTypes } from '../../config';
import '../../styles/global.css';

const ProductSlider = () => {
  const {
    content: { ...headerContent },
    customizer: { backgroundColor, theme, ...headerCustomizations }
  } = useBlockState();

  return (
    <Container
      backgroundColor={backgroundColor}
      headerProps={{ ...headerContent, ...headerCustomizations, theme }}
      style={{
        ...setThemeColors(),
        ...setBlockTheme(theme)
      }}
    >
      hi
    </Container>
  );
};

export default defineBlock({
  component: ProductSlider,
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
      headerAlignment: {
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' }
        ],
        preview: 'center'
      },
      headerSize: {
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' }
        ],
        preview: 'md'
      },
      pretitleColor: { type: 'color', label: 'Pretitle color' },
      titleColor: { type: 'color', label: 'Title color' },
      subtitleColor: { type: 'color', label: 'Description color' },
      backgroundColor: { type: 'color', label: 'Background color' },
      buttonType: {
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
      buttonLocation: {
        type: 'select',
        options: [
          { label: 'Top', value: 'top' },
          { label: 'Bottom', value: 'bottom' }
        ],
        preview: 'top'
      },
      dividerColor: { type: 'color', label: 'Divider color' },
      hasDivider: { type: 'toggle', label: 'Has divider', preview: true }
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
      buttons: {
        type: 'subschema',
        allowed: ['button'],
        max: 1,
        preview: [
          {
            subschema: 'button',
            value: {
              text: 'Button text',
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
