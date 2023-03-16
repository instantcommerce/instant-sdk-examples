# Instant SDK examples

This example project contains custom tailwind config, theming and components to make the code closely representative of our storefront code. In the future we will provide more direct access to our components and admin customization settings to increase the quality, and consistency of custom SDK blocks.

## Getting Started

Read our [documentation about installing, running, and, authenticating the SDK CLI.](https://docs.instantcommerce.io/developer-documentation/getting-started/start#installing-dependencies)

## Tailwind config

The tailwind config in this example project is a close representation of the variables we use in our storefront. These are subject to change in the storefront.

## Store’s primary and grayscale colors

The `setStoreColors` helper enables easy usage of the store’s primary and grayscale colors. It can be used with tailwind’s colour utilities and/or with css variables.

With tailwind: `className=”bg-primary-500 text-gray-100”`

With css variables:

    .section {
      background-color: var(--color-primary-500);
      color: var(--color-gray-100);
    }

This helper fetches the store’s colors and creates new css variables. In addition these variables are assigned to primary and grayscale shades in our tailwind config (`tailwind.config.cjs`).

To use `setStoreColors`, simply spread the helper in your section’s style prop:

    <section style={{ ...setThemeColors() }}>
      <div className="text-primary-700">Hello</div>
    </section>

## Theming your sections

Most of our native sections have themes to enable fast color customization. To facilitate a similar setup in the example project, we have created the `setSectionTheme` helper and added four themes: light, primary, primary inverted and dark. In many ways it’s just like the `setStoreColors` helper, except that, when using the generated CSS variables through tailwind or CSS, you have "theme" instead of "primary" and "gray" and you have "elements" instead of "shades".

Usage with tailwind: `className=”bg-theme-bg text-theme-text”`

With css variables:

    .section {
      background-color: var(--color-theme-bg);
      color: var(--color-theme-text);
    }

`setSectionTheme` creates CSS variables that reference the store’s colors as set by `setStoreColors`:

    --color-primary-700: #175CD3;
    --color-bg: var(--color-primary-700);

    .bg-theme-bg {
      background-color: var(--color-bg);
    }

You can access the variables using `setSectionTheme` and passing the section’s theme to it:

    <section
      style={{
        ...setThemeColors(),
        ...setSectionTheme(theme),
      }}
    >
    ...
    </section>

To view the full list of elements go to `tailwind.config.cjs line 35`. To view which store colors are assigned to which elements in which themes, check out `src/config/setSectionTheme.ts`. Feel free to adjust this file to your liking, but keep in mind that there will be inconsistencies between the native storefront's section themes and yours if you do.

## Style overrides

We realized we need to facilitate setups that use more than four different themes, so that you can overwrite some or all colors of a theme. For this reason, you’ll see our customisation schemas contain a lot of color fields such as `titleColor`, `backgroundColor`, and the like, where we pass inline styles to overwrite the theme colors in this example project. For instance:

    <Paragraph
      className="text-theme-title"
      style={{ ...(!!textColor ? { color: textColor } : {}) }}
    >
      Title
    </Paragraph>

This goes hand-in-hand with section theming, but it is optional (just like everything else in this example project).
