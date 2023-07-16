/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/georrychen/ChXBlockDemo/releases/tag/v13.3.0
*    Source File: backup.model.ts
*    
*    Copyrights:
*      copyright (c) 2014-2022 bjoern kimminich & the owasp juice shop contributors
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

export interface Backup {
  version: number
  continueCode?: string
  continueCodeFindIt?: string
  continueCodeFixIt?: string
  language?: string
  banners?: { welcomeBannerStatus?: string, cookieConsentStatus?: string }
  scoreBoard?: { showOnlyTutorialChallenges?: boolean, displayedChallengeCategories?: string[], displayedDifficulties?: number[], showDisabledChallenges?: boolean, showSolvedChallenges?: boolean }
}
