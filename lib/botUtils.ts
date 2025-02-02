/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: botUtils.ts
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
import models = require('../models/index')
import { type Product } from '../data/types'
import fuzz from 'fuzzball'
const security = require('./insecurity')
const challengeUtils = require('./challengeUtils')
const challenges = require('../data/datacache').challenges

async function productPrice (query: string, user: string) {
  const [products] = await models.sequelize.query('SELECT * FROM Products')
  const queriedProducts = products
    .filter((product: Product) => fuzz.partial_ratio(query, product.name) > 60)
    .map((product: Product) => `${product.name} costs ${product.price}¤`)
  return {
    action: 'response',
    body: queriedProducts.length > 0 ? queriedProducts.join(', ') : 'Sorry I couldn\'t find any products with that name'
  }
}

function couponCode (query: string, user: string) {
  challengeUtils.solveIf(challenges.bullyChatbotChallenge, () => { return true })
  return {
    action: 'response',
    body: `Oooookay, if you promise to stop nagging me here's a 10% coupon code for you: ${security.generateCoupon(10)}`
  }
}

function testFunction (query: string, user: string) {
  return {
    action: 'response',
    body: '3be2e438b7f3d04c89d7749f727bb3bd'
  }
}

module.exports = {
  productPrice,
  couponCode,
  testFunction
}
