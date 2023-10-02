/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: app.module.ts
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
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule, type Routes } from '@angular/router'
import { ConfigurationService } from '../Services/configuration.service'
import { OverlayContainer } from '@angular/cdk/overlay'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { WalletWeb3Component } from './wallet-web3.component'

const routes: Routes = [
  {
    path: '',
    component: WalletWeb3Component
  }
]

@NgModule({
  declarations: [WalletWeb3Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WalletWeb3Module {
  constructor (
    public configurationService: ConfigurationService,
    public overlayContainer: OverlayContainer
  ) {
    configurationService.getApplicationConfiguration().subscribe((conf) => {
      overlayContainer
        .getContainerElement()
        .classList.add(conf.application.theme + '-theme')
    })
  }
}
