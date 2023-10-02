/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://www.npmjs.com/package/eslint-config-himynameisdave
*    Release: https://github.com/himynameisdave/eslint-config-himynameisdave/releases/tag/v4.6.0
*    Source File: off.js
*    
*    Copyrights:
*      copyright (c) 2017-2020 @himynameisdave
*      copyright (c) 2017-2020 dave lunny <d@velunny.com>
*    
*    Licenses:
*      MIT License
*      SPDXId: MIT
*    
*    Auto-attribution by Threatrix, Inc.
*    
*    ------ END LICENSE ATTRIBUTION ------
*/
/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

module.exports = {
  extends: [
    'standard-with-typescript'
  ],
  root: true,
  parserOptions: {
    project: './src/tsconfig.*.json',
    sourceType: 'module'
  },
  rules: {
    // FIXME warnings below this line need to be checked and fixed.
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off'
  }
}
