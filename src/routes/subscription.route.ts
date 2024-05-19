import { express} from 'express'

export const SubscriptionRouter = express.Router()

/* POST subscribe for receiving rate */
SubscriptionRouter.post('/', function(req, res, next) {
  res.send('respond with a resource')
})
