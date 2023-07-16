/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/georrychen/ChXBlockDemo/releases/tag/v13.3.0
*    Source File: chatbot.service.ts
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

import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
  })
export class ChatbotService {
  private readonly hostServer = environment.hostServer
  private readonly host = this.hostServer + '/rest/chatbot'

  constructor (private readonly http: HttpClient) { }

  getChatbotStatus () {
    return this.http.get(this.host + '/status').pipe(map((response: any) => response), catchError((error: Error) => { throw error }))
  }

  getResponse (action, query) {
    return this.http.post(this.host + '/respond', { action: action, query: query }).pipe(map((response: any) => response), catchError((error: Error) => { throw error }))
  }
}
