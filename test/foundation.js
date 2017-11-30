const chai = require('chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
const { expect } = require('chai');
const path = require('path');
const { render, renderSync } = require('../src');
const { normalizePath } = require('../src/util');
const { EOL } = require('os');

const foundationVariablesFile = path.join(__dirname, 'sass', 'foundation.scss');

const EXPECTED_PROPS = ['$normalize-vertical-rhythm', '$base-font-size', '$base-line-height', '$base-unit', '$base-font-family', '$h1-font-size', 
  '$h2-font-size', '$h3-font-size', '$h4-font-size', '$h5-font-size', '$h6-font-size', '$indent-amount', '$global-font-size', 
  '$global-width', '$global-lineheight', '$foundation-palette', '$light-gray', '$medium-gray', '$dark-gray', '$black', '$white', 
  '$body-background', '$body-font-color', '$body-font-family', '$body-antialiased', '$global-margin', '$global-padding', '$global-position', 
  '$global-weight-normal', '$global-weight-bold', '$global-radius', '$global-menu-padding', '$global-menu-nested-margin', 
  '$global-text-direction', '$global-flexbox', '$global-prototype-breakpoints', '$global-button-cursor', '$global-left', '$global-right', 
  '$global-color-pick-contrast-tolerance', '$primary-color', '$secondary-color', '$success-color', '$warning-color', '$alert-color', 
  '$accordionmenu-padding', '$accordionmenu-nested-margin', '$accordionmenu-submenu-padding', '$accordionmenu-arrows', 
  '$accordionmenu-arrow-color', '$accordionmenu-item-background', '$accordionmenu-border', '$accordionmenu-submenu-toggle-background', 
  '$accordion-submenu-toggle-border', '$accordionmenu-submenu-toggle-width', '$accordionmenu-submenu-toggle-height', 
  '$accordionmenu-arrow-size', '$accordion-background', '$accordion-plusminus', '$accordion-title-font-size', '$accordion-item-color', 
  '$accordion-item-background-hover', '$accordion-item-padding', '$accordion-content-background', '$accordion-content-border', 
  '$accordion-content-color', '$accordion-content-padding', '$badge-background', '$badge-color', '$badge-color-alt', '$badge-palette', 
  '$badge-padding', '$badge-minwidth', '$badge-font-size', '$breadcrumbs-margin', '$breadcrumbs-item-font-size', '$breadcrumbs-item-color', 
  '$breadcrumbs-item-color-current', '$breadcrumbs-item-color-disabled', '$breadcrumbs-item-margin', '$breadcrumbs-item-uppercase', 
  '$breadcrumbs-item-separator', '$breadcrumbs-item-separator-item', '$breadcrumbs-item-separator-item-rtl', 
  '$breadcrumbs-item-separator-color', '$buttongroup-margin', '$buttongroup-spacing', '$buttongroup-child-selector', 
  '$buttongroup-expand-max', '$buttongroup-radius-on-each', '$button-font-family', '$button-padding', '$button-margin', '$button-fill', 
  '$button-background', '$button-background-hover', '$button-color', '$button-color-alt', '$button-radius', '$button-hollow-border-width', 
  '$button-sizes', '$button-palette', '$button-opacity-disabled', '$button-background-hover-lightness', '$button-hollow-hover-lightness', 
  '$button-transition', '$callout-background', '$callout-background-fade', '$callout-border', '$callout-margin', '$callout-padding', 
  '$callout-font-color', '$callout-font-color-alt', '$callout-radius', '$callout-link-tint', '$card-background', '$card-font-color', 
  '$card-divider-background', '$card-border', '$card-shadow', '$card-border-radius', '$card-padding', '$card-margin-bottom', 
  '$closebutton-position', '$closebutton-offset-horizontal', '$closebutton-offset-vertical', '$closebutton-size', '$closebutton-lineheight', 
  '$closebutton-color', '$closebutton-color-hover', '$drilldown-transition', '$drilldown-arrows', '$drilldown-padding', 
  '$drilldown-nested-margin', '$drilldown-background', '$drilldown-submenu-padding', '$drilldown-submenu-background', 
  '$drilldown-arrow-color', '$drilldown-arrow-size', '$dropdownmenu-arrows', '$dropdownmenu-arrow-color', '$dropdownmenu-arrow-size', 
  '$dropdownmenu-arrow-padding', '$dropdownmenu-min-width', '$dropdownmenu-background', '$dropdownmenu-submenu-background', 
  '$dropdownmenu-padding', '$dropdownmenu-nested-margin', '$dropdownmenu-submenu-padding', '$dropdownmenu-border', 
  '$dropdownmenu-border-width', '$dropdown-menu-item-color-active', '$dropdown-menu-item-background-active', '$dropdown-padding', 
  '$dropdown-background', '$dropdown-border', '$dropdown-font-size', '$dropdown-width', '$dropdown-radius', '$dropdown-sizes', 
  '$flex-source-ordering-count', '$flexbox-responsive-breakpoints', '$label-background', '$label-color', '$label-color-alt', 
  '$label-palette', '$label-font-size', '$label-padding', '$label-radius', '$mediaobject-margin-bottom', '$mediaobject-section-padding', 
  '$mediaobject-image-width-stacked', '$menu-margin', '$menu-nested-margin', '$menu-items-padding', '$menu-simple-margin', 
  '$menu-item-color-active', '$menu-item-background-active', '$menu-icon-spacing', '$menu-item-background-hover', '$menu-state-back-compat', 
  '$menu-centered-back-compat', '$menu-icons-back-compat', '$offcanvas-sizes', '$offcanvas-vertical-sizes', '$offcanvas-background', 
  '$offcanvas-shadow', '$offcanvas-inner-shadow-size', '$offcanvas-inner-shadow-color', '$offcanvas-overlay-zindex', 
  '$offcanvas-push-zindex', '$offcanvas-overlap-zindex', '$offcanvas-reveal-zindex', '$offcanvas-transition-length', 
  '$offcanvas-transition-timing', '$offcanvas-fixed-reveal', '$offcanvas-exit-background', '$maincontent-class', '$orbit-bullet-background', 
  '$orbit-bullet-background-active', '$orbit-bullet-diameter', '$orbit-bullet-margin', '$orbit-bullet-margin-top', 
  '$orbit-bullet-margin-bottom', '$orbit-caption-background', '$orbit-caption-padding', '$orbit-control-background-hover', 
  '$orbit-control-padding', '$orbit-control-zindex', '$pagination-font-size', '$pagination-margin-bottom', '$pagination-item-color', 
  '$pagination-item-padding', '$pagination-item-spacing', '$pagination-radius', '$pagination-item-background-hover', 
  '$pagination-item-background-current', '$pagination-item-color-current', '$pagination-item-color-disabled', '$pagination-ellipsis-color', 
  '$pagination-mobile-items', '$pagination-mobile-current-item', '$pagination-arrows', '$responsive-embed-margin-bottom', 
  '$responsive-embed-ratios', '$responsive-embed-ratio', '$reveal-background', '$reveal-width', '$reveal-max-width', '$reveal-padding', 
  '$reveal-border', '$reveal-radius', '$reveal-zindex', '$reveal-overlay-background', '$slider-width-vertical', '$slider-transition', 
  '$switch-background', '$switch-background-active', '$switch-height', '$switch-height-tiny', '$switch-height-small', '$switch-height-large', 
  '$switch-radius', '$switch-margin', '$switch-paddle-background', '$switch-paddle-offset', '$switch-paddle-radius', 
  '$switch-paddle-transition', '$table-background', '$table-color-scale', '$table-border', '$table-padding', '$table-hover-scale', 
  '$table-row-hover', '$table-row-stripe-hover', '$table-is-striped', '$table-striped-background', '$table-stripe', '$table-head-background', 
  '$table-head-row-hover', '$table-foot-background', '$table-foot-row-hover', '$table-head-font-color', '$table-foot-font-color', 
  '$show-header-for-stacked', '$table-stack-breakpoint', '$tab-margin', '$tab-background', '$tab-color', '$tab-background-active', 
  '$tab-active-color', '$tab-item-font-size', '$tab-item-background-hover', '$tab-item-padding', '$tab-expand-max', 
  '$tab-content-background', '$tab-content-border', '$tab-content-color', '$tab-content-padding', '$thumbnail-border', 
  '$thumbnail-margin-bottom', '$thumbnail-shadow', '$thumbnail-shadow-hover', '$thumbnail-transition', '$thumbnail-radius', 
  '$titlebar-background', '$titlebar-color', '$titlebar-padding', '$titlebar-text-font-weight', '$titlebar-icon-color', 
  '$titlebar-icon-color-hover', '$titlebar-icon-spacing', '$has-tip-cursor', '$has-tip-font-weight', '$has-tip-border-bottom', 
  '$tooltip-background-color', '$tooltip-color', '$tooltip-padding', '$tooltip-max-width', '$tooltip-font-size', '$tooltip-pip-width', 
  '$tooltip-pip-height', '$tooltip-radius', '$topbar-padding', '$topbar-background', '$topbar-submenu-background', '$topbar-title-spacing', 
  '$topbar-input-width', '$topbar-unstack-breakpoint', '$abide-inputs', '$abide-labels', '$input-background-invalid', 
  '$form-label-color-invalid', '$input-error-color', '$input-error-font-size', '$input-error-font-weight', '$fieldset-border', 
  '$fieldset-padding', '$fieldset-margin', '$legend-padding', '$form-spacing', '$helptext-color', '$helptext-font-size', 
  '$helptext-font-style', '$input-prefix-color', '$input-prefix-background', '$input-prefix-border', '$input-prefix-padding', 
  '$form-label-color', '$form-label-font-size', '$form-label-font-weight', '$form-label-line-height', '$meter-height', '$meter-radius', 
  '$meter-background', '$meter-fill-good', '$meter-fill-medium', '$meter-fill-bad', '$progress-height', '$progress-background', 
  '$progress-margin-bottom', '$progress-meter-background', '$progress-radius', '$slider-height', '$slider-background', 
  '$slider-fill-background', '$slider-handle-height', '$slider-handle-width', '$slider-handle-background', '$slider-opacity-disabled', 
  '$slider-radius', '$select-background', '$select-triangle-color', '$select-radius', '$input-color', '$input-placeholder-color', 
  '$input-font-family', '$input-font-size', '$input-font-weight', '$input-line-height', '$input-background', '$input-background-focus', 
  '$input-background-disabled', '$input-border', '$input-border-focus', '$input-padding', '$input-shadow', '$input-shadow-focus', 
  '$input-cursor-disabled', '$input-transition', '$input-number-spinners', '$input-radius', '$form-button-radius', '$grid-row-width', 
  '$grid-column-count', '$grid-column-gutter', '$grid-column-align-edge', '$grid-column-alias', '$block-grid-max', '$-zf-end-float', 
  '$prototype-arrow-directions', '$prototype-arrow-size', '$prototype-arrow-color', '$prototype-border-box-breakpoints', 
  '$prototype-border-none-breakpoints', '$prototype-bordered-breakpoints', '$prototype-border-width', '$prototype-border-type', 
  '$prototype-border-color', '$prototype-display-breakpoints', '$prototype-display', '$prototype-font-breakpoints', 
  '$prototype-wide-letter-spacing', '$prototype-font-normal', '$prototype-font-bold', '$prototype-list-breakpoints', 
  '$prototype-style-type-unordered', '$prototype-style-type-ordered', '$prototype-overflow-breakpoints', '$prototype-overflow', 
  '$prototype-position-breakpoints', '$prototype-position', '$prototype-position-z-index', '$prototype-rounded-breakpoints', 
  '$prototype-border-radius', '$prototype-separator-breakpoints', '$prototype-separator-align', '$prototype-separator-height', 
  '$prototype-separator-width', '$prototype-separator-background', '$prototype-separator-margin-top', '$prototype-shadow-breakpoints', 
  '$prototype-box-shadow', '$prototype-sizing-breakpoints', '$prototype-sizing', '$prototype-sizes', '$prototype-spacing-breakpoints', 
  '$prototype-spacers-count', '$prototype-decoration-breakpoints', '$prototype-text-decoration', '$prototype-transformation-breakpoints', 
  '$prototype-text-transformation', '$prototype-utilities-breakpoints', '$prototype-text-overflow', '$header-font-family', 
  '$header-font-weight', '$header-font-style', '$font-family-monospace', '$header-color', '$header-lineheight', '$header-margin-bottom', 
  '$header-styles', '$header-text-rendering', '$small-font-size', '$header-small-font-color', '$paragraph-lineheight', 
  '$paragraph-margin-bottom', '$paragraph-text-rendering', '$code-color', '$code-font-family', '$code-font-weight', '$code-background', 
  '$code-border', '$code-padding', '$anchor-color', '$anchor-color-hover', '$anchor-text-decoration', '$anchor-text-decoration-hover', 
  '$hr-width', '$hr-border', '$hr-margin', '$list-lineheight', '$list-margin-bottom', '$list-style-type', '$list-style-position', 
  '$list-side-margin', '$list-nested-side-margin', '$defnlist-margin-bottom', '$defnlist-term-weight', '$defnlist-term-margin-bottom', 
  '$blockquote-color', '$blockquote-padding', '$blockquote-border', '$cite-font-size', '$cite-color', '$cite-pseudo-content', 
  '$keystroke-font', '$keystroke-color', '$keystroke-background', '$keystroke-padding', '$keystroke-radius', '$abbr-underline', 
  '$lead-font-size', '$lead-lineheight', '$subheader-lineheight', '$subheader-color', '$subheader-font-weight', '$subheader-margin-top', 
  '$subheader-margin-bottom', '$stat-font-size', '$print-transparent-backgrounds', '$print-hrefs', '$breakpoints', '$print-breakpoint', 
  '$-zf-zero-breakpoint', '$-zf-breakpoints-keys', '$breakpoint-classes', '$contrast-warnings', '$-zf-flex-justify', '$-zf-flex-align', 
  '$-zf-flex-direction', '$-zf-font-stack', '$xy-grid', '$grid-container', '$grid-columns', '$grid-margin-gutters', '$grid-padding-gutters', 
  '$grid-container-padding', '$grid-container-max', '$xy-block-grid-max', '$_normalize-include', '$_normalize-exclude', '$-zf-size', 
  '$-zf-bp-value'
];

const EXPECTED_SELECTED_VAR_VALUES = [
  { prop: '$normalize-vertical-rhythm', val: { type: 'SassBoolean', value: true } },
  { prop: '$h1-font-size', val: { type: 'SassNumber', value: 40, unit: 'px' } },
  { prop: '$h4-font-size', val: { type: 'SassNumber', value: 20, unit: 'px' } },

  { prop: '$primary-color', val: { type: 'SassColor', value: { r: 0, g: 0, b: 0, a: 1, hex: '#000000' } } },
  { prop: '$secondary-color', val: { type: 'SassColor', value: { r: 255, g: 255, b: 255, a: 1, hex: '#ffffff' } } },
  { prop: '$success-color', val: { type: 'SassColor', value: { r: 0, g: 128, b: 0, a: 1, hex: '#008000' } } },
  { prop: '$warning-color', val: { type: 'SassColor', value: { r: 255, g: 255, b: 0, a: 1, hex: '#ffff00' } } },
  { prop: '$alert-color', val: { type: 'SassColor', value: { r: 255, g: 0, b: 0, a: 1, hex: '#ff0000' } } },

  { prop: '$input-background-invalid', val: { type: 'SassColor', value: { r: 255, g: 0, b: 0, a: 1, hex: '#ff0000' } } },  

  { prop: '$-zf-size', val: { type: 'SassString', value: 'large' } },
  { prop: '$-zf-zero-breakpoint', val: { type: 'SassString', value: 'small' } },
  { prop: '$-zf-breakpoints-keys', val: { type: 'SassList', value: [ { value: 'small', value: 'medium', value: 'large', value: 'xlarge' }] } },

  { prop: '$form-spacing', val: { type: 'SassNumber', value: 1, unit: 'rem' } },

  { prop: '$meter-radius', val: { type: 'SassNumber', value: 20, unit: 'px' } },
  { prop: '$meter-fill-medium', val: { type: 'SassColor', value: { r: 15, g: 15, b: 15, a: 1, hex: '#0f0f0f' } } },

  { prop: '$badge-palette', val: { type: 'SassMap', value: { 
    primary: { value: { hex: '#000000' } },
    secondary: { value: { hex: '#ffffff' } },
    success: { value: { hex: '#008000' } },
    warning: { value: { hex: '#ffff00' } },
    alert: { value: { hex: '#ff0000' } },
  } } },

  { prop: '$accordion-title-font-size', val: { type: 'SassNumber', value: 0.75, unit: 'rem' } },

  { prop: '$grid-column-count', val: { type: 'SassNumber', value: 20 } },

  { prop: '$form-label-font-weight', val: { type: 'SassString', value: 'bold' } },
];


function verifyFoundation(rendered, sourceFile) {
  expect(rendered.vars).to.exist;
  expect(rendered.vars).to.have.property('global');

  EXPECTED_PROPS.forEach(prop => expect(rendered.vars.global).to.have.property(prop));

  EXPECTED_SELECTED_VAR_VALUES.forEach(({ prop, val }) => {
    expect(rendered.vars.global).to.have.property(prop);
    expect(rendered.vars.global[prop]).to.containSubset(val);
  });
}

describe('foundation-variables', function() {
  beforeEach(function() {
    if(process.env.FAST_TEST) {
      this.skip();
    }
  });

  describe('sync', () => {
    it('should extract all variables', () => {
      const rendered = renderSync({ file: foundationVariablesFile })
      verifyFoundation(rendered, foundationVariablesFile);
    });
  });

  describe('async', () => {
    it('should extract all variables', () => {
      return render({ file: foundationVariablesFile })
      .then(rendered => {
        verifyFoundation(rendered, foundationVariablesFile);
      });
    });
  });
});
