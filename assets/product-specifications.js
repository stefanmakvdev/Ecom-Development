if (!customElements.get('product-specifications')) {
  customElements.define(
    'product-specifications',
    class ProductSpecifications extends HTMLElement {
      constructor() {
        super();
        this.grid = this.querySelector('[data-spec-grid]');
        this.templates = this.querySelector('[data-spec-templates]');
        this.variantChangeUnsubscriber = undefined;
      }

      connectedCallback() {
        if (!this.grid || !this.templates) return;

        this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
          if (!event.data?.variant?.id) return;
          this.renderVariant(event.data.variant.id);
        });
      }

      disconnectedCallback() {
        if (this.variantChangeUnsubscriber) {
          this.variantChangeUnsubscriber();
        }
      }

      renderVariant(variantId) {
        const template = this.templates.content.querySelector(`[data-variant-id="${variantId}"]`);
        if (!template) return;
        this.grid.innerHTML = template.innerHTML;
      }
    }
  );
}
