/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/georrychen/ChXBlockDemo/releases/tag/v13.3.0
*    Source File: webhook.ts
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

import os from 'os'
import { promisify } from 'util'
import request from 'request'
import logger from './logger'
import config from 'config'
import colors from 'colors/safe'
import type { CoreOptions, RequestCallback, Request } from 'request'
import * as utils from './utils'
import { totalCheatScore } from './antiCheat'
// force type of post as promisify doesn't know which one it should take
const post = promisify(request.post as ((uri: string, options?: CoreOptions, callback?: RequestCallback) => Request))

export const notify = async (challenge: { key: any, name: any }, cheatScore = -1, webhook = process.env.SOLUTIONS_WEBHOOK) => {
  if (!webhook) {
    return
  }
  const res = await post(webhook, {
    json: {
      solution: {
        challenge: challenge.key,
        cheatScore: cheatScore,
        totalCheatScore: totalCheatScore(),
        issuedOn: new Date().toISOString()
      },
      ctfFlag: utils.ctfFlag(challenge.name),
      issuer: {
        hostName: os.hostname(),
        os: `${os.type()} (${os.release()})`,
        appName: config.get('application.name'),
        config: process.env.NODE_ENV ?? 'default',
        version: utils.version()
      }
    }
  })
  logger.info(`Webhook ${colors.bold(webhook)} notified about ${colors.cyan(challenge.key)} being solved: ${res.statusCode < 400 ? colors.green(res.statusCode.toString()) : colors.red(res.statusCode.toString())}`)
}
