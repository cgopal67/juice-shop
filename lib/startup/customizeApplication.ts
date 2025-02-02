/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: customizeApplication.ts
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

import fs = require('fs')
import config from 'config'
import * as utils from '../utils'
const replace = require('replace')

const customizeApplication = () => {
  if (config.get('application.name')) {
    customizeTitle()
  }
  if (config.get('application.logo')) {
    void customizeLogo()
  }
  if (config.get('application.favicon')) {
    void customizeFavicon()
  }
  if (config.get('application.theme')) {
    customizeTheme()
  }
  if (config.get('application.cookieConsent')) {
    customizeCookieConsentBanner()
  }
  if (config.get('application.promotion')) {
    void customizePromotionVideo()
    void customizePromotionSubtitles()
  }
  if (config.get('hackingInstructor')) {
    void customizeHackingInstructorAvatar()
  }
  if (config.get('application.chatBot')) {
    void customizeChatbotAvatar()
  }
}

const customizeLogo = async () => {
  await retrieveCustomFile('application.logo', 'frontend/dist/frontend/assets/public/images')
}

const customizeChatbotAvatar = async () => {
  const avatarImage = await retrieveCustomFile('application.chatBot.avatar', 'frontend/dist/frontend/assets/public/images')
  fs.copyFileSync('frontend/dist/frontend/assets/public/images/' + avatarImage, 'frontend/dist/frontend/assets/public/images/ChatbotAvatar.png')
}

const customizeHackingInstructorAvatar = async () => {
  const avatarImage = await retrieveCustomFile('hackingInstructor.avatarImage', 'frontend/dist/frontend/assets/public/images')
  fs.copyFileSync('frontend/dist/frontend/assets/public/images/' + avatarImage, 'frontend/dist/frontend/assets/public/images/hackingInstructor.png')
}

const customizeFavicon = async () => {
  const favicon = await retrieveCustomFile('application.favicon', 'frontend/dist/frontend/assets/public')
  replace({
    regex: /type="image\/x-icon" href="assets\/public\/.*"/,
    replacement: `type="image/x-icon" href="assets/public/${favicon}"`,
    paths: ['frontend/dist/frontend/index.html'],
    recursive: false,
    silent: true
  })
}

const customizePromotionVideo = async () => {
  await retrieveCustomFile('application.promotion.video', 'frontend/dist/frontend/assets/public/videos')
}

const customizePromotionSubtitles = async () => {
  await retrieveCustomFile('application.promotion.subtitles', 'frontend/dist/frontend/assets/public/videos')
}

const retrieveCustomFile = async (sourceProperty: string, destinationFolder: string) => {
  let file = config.get<string>(sourceProperty)
  if (utils.isUrl(file)) {
    const filePath = file
    file = utils.extractFilename(file)
    await utils.downloadToFile(filePath, destinationFolder + '/' + file)
  }
  return file
}

const customizeTitle = () => {
  const title = `<title>${config.get('application.name')}</title>`
  replace({
    regex: /<title>.*<\/title>/,
    replacement: title,
    paths: ['frontend/dist/frontend/index.html'],
    recursive: false,
    silent: true
  })
}

const customizeTheme = () => {
  const bodyClass = '"mat-app-background ' + config.get('application.theme') + '-theme"'
  replace({
    regex: /"mat-app-background .*-theme"/,
    replacement: bodyClass,
    paths: ['frontend/dist/frontend/index.html'],
    recursive: false,
    silent: true
  })
}

const customizeCookieConsentBanner = () => {
  const contentProperty = '"content": { "message": "' + config.get('application.cookieConsent.message') + '", "dismiss": "' + config.get('application.cookieConsent.dismissText') + '", "link": "' + config.get('application.cookieConsent.linkText') + '", "href": "' + config.get('application.cookieConsent.linkUrl') + '" }'
  replace({
    regex: /"content": { "message": ".*", "dismiss": ".*", "link": ".*", "href": ".*" }/,
    replacement: contentProperty,
    paths: ['frontend/dist/frontend/index.html'],
    recursive: false,
    silent: true
  })
}

module.exports = customizeApplication
