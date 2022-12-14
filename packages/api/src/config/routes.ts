import { CARDS_PATH_PREFIX } from '@api/constants'
import subscribeHandler from '@api/features/subscribe/handler'
import {
  webhooksHandler,
  subscriptionConfirmationHandler
} from '@api/features/webhooks/handler'
import { receiveNidHandler } from '@api/features/receive/handler'
import { generateMosipAidReqHandler } from '@api/features/generateMosipAid'

export const getRoutes = () => {
  const routes = [
    // add ping route by default for health check
    {
      method: 'GET',
      path: '/ping',
      handler: (request: any, h: any) => {
        // Perform any health checks and return true or false for success prop
        return {
          success: true
        }
      },
      config: {
        auth: false,
        tags: ['api'],
        description: 'Health check endpoint'
      }
    },
    {
      method: 'POST',
      path: '/subscribe',
      handler: subscribeHandler,
      config: {
        auth: false,
        tags: ['api']
      }
    },
    {
      method: 'POST',
      path: '/webhooks',
      handler: webhooksHandler,
      config: {
        auth: false,
        tags: ['api']
      }
    },
    {
      method: 'GET',
      path: '/webhooks',
      handler: subscriptionConfirmationHandler,
      config: {
        auth: false,
        tags: ['api']
      }
    },
    {
      method: 'POST',
      path: '/birthReceiveNid',
      handler: receiveNidHandler,
      config: {
        auth: false,
        tags: ['api']
      }
    },
    {
      method: 'GET',
      path: '/generateMosipAid',
      handler: generateMosipAidReqHandler,
      config: {
        auth: false,
        tags: ['api']
      }
    },
    {
      method: 'GET',
      path: `${CARDS_PATH_PREFIX}/getCards/{params*}`,
      handler: {
        directory: {
          path: 'cards',
          listing: true
        }
      }
    }
  ]
  return routes
}
