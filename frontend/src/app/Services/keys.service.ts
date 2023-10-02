/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.0.3
*    Source File: user.service.ts
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
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class KeysService {
  private readonly hostServer = environment.hostServer
  private readonly host = this.hostServer + '/rest/web3'

  constructor (private readonly http: HttpClient) {}

  nftUnlocked () {
    return this.http.get(this.host + '/nftUnlocked').pipe(
      map((response: any) => response),
      catchError((err) => {
        throw err
      })
    )
  }

  nftMintListen () {
    return this.http.get(this.host + '/nftMintListen').pipe(
      map((response: any) => response),
      catchError((err) => {
        throw err
      })
    )
  }

  checkNftMinted () {
    return this.http.get(this.hostServer + '/api/Challenges/?key=nftMintChallenge').pipe(
      map((response: any) => response),
      catchError((err) => {
        throw err
      })
    )
  }

  submitKey (privateKey: string) {
    const endpoint = this.host + '/submitKey'
    const params = { privateKey }
    return this.http.post(endpoint, params).pipe(
      map((response: any) => response),
      catchError((err) => {
        throw err
      })
    )
  }

  verifyNFTWallet (walletAddress: string) {
    const endpoint = this.host + '/walletNFTVerify'
    const params = { walletAddress }
    return this.http.post(endpoint, params).pipe(
      map((response: any) => response),
      catchError((err) => {
        throw err
      })
    )
  }

  walletAddressSend (walletAddress: string) {
    const endpoint = this.host + '/walletExploitAddress'
    const params = { walletAddress }
    return this.http.post(endpoint, params).pipe(
      map((response: any) => response),
      catchError((err) => {
        throw err
      })
    )
  }
}
