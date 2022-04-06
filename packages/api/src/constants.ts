import * as fs from 'fs'
import * as util from 'util'
import { logger } from '@api/logger'

const get = (secret: string) => {
  try {
    // Swarm secret are accessible within tmpfs /run/secrets dir
    return fs
      .readFileSync(util.format('/run/secrets/%s', secret), 'utf8')
      .trim()
  } catch (e) {
    return false
  }
}

export const HOST = process.env.HOST || '0.0.0.0'
export const PORT = process.env.PORT || 4545

export const WEBHOOK_URL = process.env.WEBHOOK_URL || '' // Insert your webhook URL
export const AUTH_URL = process.env.AUTH_URL || '' // Insert the URL to your OpenCRVS auth service installation
export const CALLBACK_URL = process.env.CALLBACK_URL || '' // Insert your webhooks URL here for Verification Request and Event Notification
export const CLIENT_ID = get('CLIENT_ID') || (process.env.CLIENT_ID as string)
export const CLIENT_SECRET =
  get('CLIENT_SECRET') || (process.env.CLIENT_SECRET as string)
export const SHA_SECRET =
  get('SHA_SECRET') || (process.env.SHA_SECRET as string)
export const MOSIP_BIRTH_PROXY_CALLBACK_URL =
  process.env.MOSIP_BIRTH_PROXY_CALLBACK_URL || '' // Insert your URL here to which the birth event has to be proxied to
export const MOSIP_DEATH_PROXY_CALLBACK_URL =
  process.env.MOSIP_DEATH_PROXY_CALLBACK_URL || '' // Insert your URL here to which the death event has to be proxied to
export const MOSIP_AUTH_URL = process.env.MOSIP_AUTH_URL || ''
export const MOSIP_AUTH_CLIENT = process.env.MOSIP_AUTH_CLIENT || ''
export const MOSIP_AUTH_USER = process.env.MOSIP_AUTH_USER || ''
export const MOSIP_AUTH_PASS = process.env.MOSIP_AUTH_PASS || ''

export const KEY_SPLITTER = '#KEY_SPLITTER#'
export const VERSION_RSA_2048 = 'VER_R2'
// export const SIGN_ALGORITHM = 'RSA-SHA256'
export const SYMMETRIC_ALGORITHM = 'AES-GCM'
export const ASYMMETRIC_ALGORITHM = 'RSA-OAEP'
export const SYMMETRIC_KEY_SIZE: number = 32
export const NONCE_SIZE: number = 12
export const AAD_SIZE: number = 32
export const GCM_TAG_LENGTH: number = 16

export const IS_THUMBRPINT: boolean =
  process.env.IS_THUMBRPINT !== 'true' ? false : true
export const THUMBPRINT_LENGTH: number = 32

// export const ASYMMETRIC_ENCRYPT_ALGORITHM = 'RSA/ECB/PKCS1Padding'
const MOSIP_PUBLIC_KEY_PATH =
  process.env.MOSIP_PUBLIC_KEY_PATH || '/certs/mnt/mosip-public.key'
const OPENCRVS_PRIV_KEY_PATH =
  process.env.OPENCRVS_PRIV_KEY_PATH || '/certs/mnt/opencrvs-priv.key'
if (!fs.existsSync(MOSIP_PUBLIC_KEY_PATH)) {
  logger.error(`Cannot find mosip public key at: ${MOSIP_PUBLIC_KEY_PATH}`)
  process.exit(1)
}
if (!fs.existsSync(OPENCRVS_PRIV_KEY_PATH)) {
  logger.error(`Cannot find opencrvs priv key at: ${OPENCRVS_PRIV_KEY_PATH}`)
  process.exit(1)
}
export const MOSIP_PUBLIC_KEY: string = fs
  .readFileSync(MOSIP_PUBLIC_KEY_PATH)
  .toString('utf8')
export const OPENCRVS_PRIV_KEY: string = fs
  .readFileSync(OPENCRVS_PRIV_KEY_PATH)
  .toString('utf8')
