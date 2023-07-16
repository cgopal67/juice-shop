/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/georrychen/ChXBlockDemo/releases/tag/v13.3.0
*    Source File: privacy-policy.component.ts
*    
*    Copyrights:
*      copyright (c) 2014-2021 bjoern kimminich & the owasp juice shop contributors
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

import { Component, Inject, OnInit } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { ConfigurationService } from '../Services/configuration.service'

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
  })
export class PrivacyPolicyComponent implements OnInit {
  public applicationName: string = 'OWASP Juice Shop'
  public privacyContactEmail!: string
  public applicationUrl!: string

  constructor (@Inject(DOCUMENT) private readonly _document: HTMLDocument, private readonly configurationService: ConfigurationService) { }

  ngOnInit (): void {
    this.applicationUrl = this._document.location.protocol + '//' + this._document.location.hostname
    this.configurationService.getApplicationConfiguration().subscribe((config: any) => {
      if (config?.application?.name) {
        this.applicationName = config.application.name
      }
      if (config?.application?.privacyContactEmail) {
        this.privacyContactEmail = config.application.privacyContactEmail
      } else {
        this.privacyContactEmail = `donotreply@${this._document.location.hostname}`
      }
    }, (err) => console.log(err))
  }
}
