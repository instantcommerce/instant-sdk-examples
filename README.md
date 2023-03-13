# Instant SDK examples

This example project contains custom tailwind config, theming and components to make the code closely representative of our storefront code. In the future we will provide more direct access to our components and admin customization settings to increase the quality and consistency of custom SDK blocks.

## Getting Started

[Development docs for the installation, running and auth](https://docs.instantcommerce.io/developer-documentation/getting-started/start#installing-dependencies)

## Tailwind config

The tailwind config in this example project is a close representation of the variables we use in our storefront. These are subject to change in the storefront.

Further explanations about the tailwind theme colors are below.

## Store’s primary and grayscale colors

The `setStoreColors` helper enables easy usage of the store’s primary and grayscale colors. It can be used with tailwind’s colour utilities and/or with css variables.

With tailwind’s colour utilities: `className=”bg-primary-500 text-gray-100”`

With css variables:

    .section {
      background-color: var(--color-primary-500);
      color: var(--color-gray-100);
    }

This helper fetches the store’s colors and creates new css variables. In addition these variables are assigned to primary and grayscale shades in our tailwind config (`tailwind.config.cjs`), which creates the perfect marriage.

To use `setStoreColors`, simply spread the helper in your section’s style prop:

    <section style={{ ...setThemeColors() }}>
      <div className="text-primary-700">Hello</div>
    </section>

## Theming your sections

Most of our native sections have themes to enable fast colour customisation. To facilitate a similar setup in the example project we have created the `setSectionTheme` helper and added 4 themes: light, primary, primary inverted and dark. In many ways it’s just like the `setStoreColors` helper, but when using the generated css variables through tailwind and/or css, instead of primary and gray you have theme, and instead of the shades you have elements.

Usage with tailwind colour utilities: `className=”bg-theme-bg text-theme-text”`

With css variables:

    .section {
      background-color: var(--color-theme-bg);
      color: var(--color-theme-text);
    }

`setSectionTheme` creates css variables that reference to the store’s colors that are set by `setStoreColors`:

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

To view the full list of elements go to `tailwind.config.cjs line 35`. To view what store colors are assigned to what elements in what themes, check out `src/config/setSectionTheme.ts`. Feel free to adjust to your liking, keep in mind that then there will be inconsistencies between the native storefront section themes and yours.

## Style overrides

We have discovered that having 5 different themes is not enough for our merchants. They prefer to be able to overwrite certain or all colors of the theme, hence you’ll see our customisation schema’s contain a lot of colour fields such as `titleColor`, `backgroundColor`, etc and us passing inline styles to overwrite the theme colors. E.g.

    <Paragraph
      className="text-theme-title"
      style={{ ...(!!textColor ? { color: textColor } : {}) }}
    >
      Title
    </Paragraph>

This goes hand-in-hand with the section theming but is optional to do just like everything else in the example project.
