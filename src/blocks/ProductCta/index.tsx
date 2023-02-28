import { defineBlock, useBlockState } from "@instantcommerce/sdk";

const ProductCta = () => {
  const { content, customizer } = useBlockState();

  return (
    <div>
      <h1 style={{ color: customizer.color }}>
        {content.title}
      </h1>
    </div>
  );
};

export default defineBlock({
  component: ProductCta,
  customizerSchema: {
    fields: {
      color: { type: "color", label: "Color" },
    },
  },
  contentSchema: {
    fields: {
      title: { type: "text", label: "Title", preview: 'Hero title' },
    },
  },
});
;
