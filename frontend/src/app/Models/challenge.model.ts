/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v12.9.0
*    Source File: challenge.model.ts
*    
*    Copyrights:
*      copyright (c) 2014-2021 bjoern kimminich
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

import { SafeHtml } from '@angular/platform-browser'

export interface Challenge {
  name: string
  category: string
  tags?: string
  description?: string | SafeHtml
  difficulty: number
  hint?: string
  hintUrl?: string
  disabledEnv?: string
  solved?: boolean
  tutorialOrder?: number
  hasTutorial?: boolean
  hasSnippet?: boolean
  codingChallengeStatus?: number
}
