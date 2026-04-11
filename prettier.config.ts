import { type Config } from 'prettier'

/**
 * @see https://prettier.io/docs/configuration
 * @see https://github.com/kurttheviking/prettier-plugin-pkg
 */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  experimentalTernaries: false,
  jsxSingleQuote: true,
  printWidth: 100,
  // proseWrap: 'always',
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-pkg'],
} satisfies Config

export default config
