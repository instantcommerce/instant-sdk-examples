# Project Title

This example project with custom tailwind config, theming and components is closely representative of our storefront code. We hope in the future to provide more direct access to our components and admin customisation settings to increase the quality and consistency of the custom SDK blocks to our storefront.

## Getting Started

[Development docs for the installation, running and auth ](https://docs.instantcommerce.io/developer-documentation/getting-started/start#installing-dependencies)

## Tailwind config

The tailwind config in this example project is a close representation of the variables we use in our storefront. These are subject to change in the storefront. 

Further explanations about the tailwind theme colours are below.

## Store’s primary and grayscale colours

The `setStoreColors` helper enables easy usage of the store’s primary and grayscale colours. It can be used with tailwind’s colour utilities and/or with css variables.

With tailwind’s colour utilities: `className=”bg-primary-500 text-gray-100”`

With css variables:

    .section {
      background-color: var(--color-primary-500);
      color: var(--color-gray-100);
    }

This helper fetches the store’s colours and creates new css variables. In addition these variables are assigned to primary and grayscale shades in our tailwind config (`tailwind.config.cjs`), which creates the perfect marriage.

To use `setStoreColors`, simply spread the helper in your section’s style prop:

    <section style={{ ...setThemeColors() }}>
      <div className="text-primary-700">Hello</div>
    </section>

## Theming your sections

Most of our native sections have themes to enable fast colour customisation. We have light, dark, primary, primary light and gray themes. To facilitate a similar setup in the example project we have created the `setSectionTheme` helper. In many ways it’s just like the `setStoreColors` helper, but when using the generated css variables through tailwind and/or css, instead of primary and gray you have theme, and instead of the shades you have elements. 

Usage with tailwind colour utilities: `className=”bg-theme-bg text-theme-text”`

With css variables:

    .section {
      background-color: var(--color-theme-bg);
      color: var(--color-theme-text);
    }

`setSectionTheme` creates css variables that reference to the store’s colours that are set by `setStoreColors`:

    --color-primary-700: #175CD3;
    --color-bg: var(--color-primary-700);

    .bg-theme-bg {
      background-color: var(--color-bg);
    }

You can access the variables using setSectionTheme and passing the section’s theme to it.

    <section
      style={{
        ...setThemeColors(),
        ...setSectionTheme(theme),
      }}
    >
    ...
    </section>

To view the full list of elements go to `tailwind.config.cjs line 35`. To view what store colours are assigned to what elements in what themes, check out `src/config/setSectionTheme.ts`. Feel free to adjust to your liking, keep in mind that then there will be inconsistencies between the native storefront section themes and yours.

## Style overrides

We have discovered that having 5 different themes is not enough for our merchants. They prefer to be able to overwrite certain or all colours of the theme, hence you’ll see our customisation schema’s contain a lot of colour fields such as `titleColor`, `backgroundColor`, etc and us passing inline styles to overwrite the theme colours. E.g.

    <Paragraph
      className="text-theme-title"
      style={{ ...(!!textColor ? { color: textColor } : {}) }}
    >
      Title
    </Paragraph>

This goes hand-in-hand with the section theming but is optional to do just like everything else in the example project.


## Identifiable classNames

You’ll notice that all of our sections and elements have readable/targetable classnames. We have found that clients like to use custom css (themselves or through agencies) to further customise their store. These classnames foolproof a lot of custom css, so we advise you to add them if you want to enable the merchants to target elements more precisely.