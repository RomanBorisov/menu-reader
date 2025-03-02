// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const stylisticJs = require('@stylistic/eslint-plugin-js');
const stylisticTs = require('@stylistic/eslint-plugin-ts');

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    plugins: {
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@stylistic/js/indent': ['error', 4, {"SwitchCase": 1}],
      "@stylistic/js/object-curly-spacing": ["error", "always"],
      "@stylistic/ts/semi": ["error", "always"],
      "@stylistic/ts/quotes": [
        "error",
        "single",
        {
          "allowTemplateLiterals": true
        }
      ],
      "@stylistic/ts/member-delimiter-style": [
        "error",
        {
          "multiline": {
            "delimiter": "semi",
            "requireLast": true
          },
          "singleline": {
            "delimiter": "comma",
            "requireLast": false
          }
        }
      ],
      "@stylistic/ts/type-annotation-spacing": "error",


      "@angular-eslint/component-class-suffix": "error",

      // it's ok without
      "@angular-eslint/component-max-inline-declarations": "off",

      "@angular-eslint/component-selector": [
        "error",
        {
          "type": "element",
          "prefix": "app",
          "style": "kebab-case"
        }
      ],

      "@angular-eslint/contextual-decorator": "error",
      "@angular-eslint/contextual-lifecycle": "error",

      // it's not ok for abstract classes
      "@angular-eslint/directive-class-suffix": "off",

      "@angular-eslint/directive-selector": [
        "error",
        {
          "type": "attribute",
          "prefix": "app"
        }
      ],

      "@angular-eslint/no-attribute-decorator": "error",
      "@angular-eslint/no-conflicting-lifecycle": "error",
      "@angular-eslint/no-empty-lifecycle-method": "error",

      // custom form controls
      "@angular-eslint/no-forward-ref": "off",

      // it's very common and usefull
      "@angular-eslint/no-host-metadata-property": "off",

      "@angular-eslint/no-input-prefix": "error",
      "@angular-eslint/no-input-rename": "error",
      "@angular-eslint/no-inputs-metadata-property": "error",
      "@angular-eslint/no-lifecycle-call": "error",
      "@angular-eslint/no-output-native": "error",
      "@angular-eslint/no-output-on-prefix": "error",
      "@angular-eslint/no-output-rename": "error",
      "@angular-eslint/no-outputs-metadata-property": "error",
      "@angular-eslint/no-pipe-impure": "error",
      "@angular-eslint/no-queries-metadata-property": "error",
      "@angular-eslint/pipe-prefix": "error",
      "@angular-eslint/prefer-output-readonly": "error",
      // "@angular-eslint/prefer-standalone-component": "error",
      "@angular-eslint/relative-url-prefix": "error",
      "@angular-eslint/require-localize-metadata": "off",
      "@angular-eslint/use-component-selector": "error",
      "@angular-eslint/use-component-view-encapsulation": "off",
      "@angular-eslint/use-injectable-provided-in": "off",
      "@angular-eslint/use-lifecycle-interface": "error",
      "@angular-eslint/use-pipe-transform-interface": "error",
      "@typescript-eslint/adjacent-overload-signatures": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "variable",
          "modifiers": [
            "const"
          ],
          "format": [
            "UPPER_CASE",
            "camelCase",
            "PascalCase"
          ]
        },
        {
          "selector": "enumMember",
          "format": [
            "PascalCase"
          ]
        },
        {
          "selector": [
            "memberLike",
            "variableLike"
          ],
          "modifiers": [
            "private"
          ],
          "format": [
            "UPPER_CASE",
            "camelCase",
            "PascalCase"
          ],
          "leadingUnderscore": "require"
        }
      ],
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          "accessibility": "explicit",
          "overrides": {
            "accessors": "off",
            "constructors": "no-public",
            "methods": "explicit",
            "properties": "explicit",
            "parameterProperties": "explicit"
          }
        }
      ],
      "@typescript-eslint/class-literal-property-style": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/member-ordering": [
        "error",
        {
          "default": {
            "memberTypes": "never"
          },
          "classes": [
            "public-static-field",
            "protected-static-field",
            "private-static-field",

            "public-decorated-field",
            "protected-decorated-field",
            "private-decorated-field",

            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",
            "public-abstract-field",
            "protected-abstract-field",

            "public-field",
            "instance-field",

            "protected-field",
            "private-field",
            "abstract-field",

            "public-get",
            "protected-get",
            "private-get",

            "constructor",

            "public-static-method",
            "protected-static-method",
            "private-static-method",

            "public-method",
            "protected-method",
            "private-method",
          ]
        }
      ],
      "@typescript-eslint/no-array-constructor": "error",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-for-in-array": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-parameter-properties": "off",
      "@typescript-eslint/no-this-alias": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": ["error",
        {
          "args": "none"
        }
      ],
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/prefer-namespace-keyword": "error",
      "@typescript-eslint/prefer-regexp-exec": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/triple-slash-reference": [
        "error",
        {
          "path": "always",
          "types": "prefer-import",
          "lib": "always"
        }
      ],
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/unified-signatures": "error",

      ///---------------------

      "prefer-spread": "off",
      "prefer-rest-params": "off",
      "no-prototype-builtins": "off",
      "no-useless-escape": "off",
      "no-extra-boolean-cast": "off",
      "no-case-declarations": "off",
      "arrow-spacing": "error",
      "arrow-body-style": "off",
      "arrow-parens": [
        "error",
        "always"
      ],
      "complexity": "off",
      "constructor-super": "error",
      "curly": "error",
      "default-case": "error",
      "eol-last": "error",
      "eqeqeq": [
        "error",
        "smart"
      ],
      "guard-for-in": "off",
      "id-blacklist": [
        "error",
        "any"
      ],
      "id-match": "error",
      "import/no-deprecated": "off",
      "max-classes-per-file": "off",
      "no-redeclare": "error",
      "max-len": [
        "off",
        {
          "code": 140
        }
      ],
      "new-parens": "error",
      "no-array-constructor": "error",
      "no-bitwise": "off",
      "no-caller": "error",
      "no-cond-assign": "error",
      "no-console": "off",
      "no-debugger": "error",
      "no-empty": "off",
      "no-empty-function": [
        "error",
        {
          "allow": [
            "constructors"
          ]
        }],
      "no-eval": "error",
      "no-extra-semi": "off",
      "no-fallthrough": "error",
      "no-invalid-this": "off",
      "no-multiple-empty-lines": [
        "error",
        {
          "max": 1
        }
      ],
      "no-new-wrappers": "error",
      "no-restricted-imports": [
        "error",
        "rxjs/Rx"
      ],
      "no-throw-literal": "error",
      "no-trailing-spaces": "error",
      "no-undef-init": "error",
      "no-underscore-dangle": "off",
      "no-unsafe-finally": "error",
      "no-unused-labels": "error",
      "no-unused-vars": "off",
      "no-var": "error",
      "object-shorthand": "error",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "off",
      "one-var": [
        "error",
        "never"
      ],
      "prefer-const": "off",
      "quote-props": [
        "error",
        "as-needed"
      ],
      "radix": "error",
      "require-await": "off",
      "space-before-function-paren": [
        "error",
        {
          "anonymous": "never",
          "asyncArrow": "always",
          "named": "never"
        }
      ],
      "spaced-comment": [
        "error",
        "always"
      ],
      "space-before-blocks": "error",
      "use-isnan": "error",
      "valid-typeof": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      // we don't have a11y rules yet
      "@angular-eslint/template/alt-text": "off",

      "@angular-eslint/template/banana-in-box": "error",
      "@angular-eslint/template/button-has-type": "error",

      // it's ok without
      "@angular-eslint/template/click-events-have-key-events": "off",

      "@angular-eslint/template/conditional-complexity": [
        "error",
        {
          "maxComplexity": 5
        }
      ],

      // we don't have a11y rules yet
      "@angular-eslint/template/elements-content": "off",

      "@angular-eslint/template/eqeqeq": "error",

      // it's ok without
      "@angular-eslint/template/mouse-events-have-key-events": "off",

      "@angular-eslint/template/no-any": "error",

      // TODO probably possible to fix
      "@angular-eslint/template/no-autofocus": "off",

      "@angular-eslint/template/no-call-expression": "warn",

      "@angular-eslint/template/no-distracting-elements": "error",

      // there are some cases like name and attr.name with different behavior in browsers
      "@angular-eslint/template/no-duplicate-attributes": "off",


      "@angular-eslint/template/no-interpolation-in-attributes": "error",

      // it is very usefull
      "@angular-eslint/template/no-negated-async": "off",

      // it's ok without
      "@angular-eslint/template/prefer-self-closing-tags": "off",

      "@angular-eslint/template/role-has-required-aria": "error",
      "@angular-eslint/template/table-scope": "error",
      "@angular-eslint/template/use-track-by-function": "error",
      "@angular-eslint/template/valid-aria": "error"
    },
  }
);
