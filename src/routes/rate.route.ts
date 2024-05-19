import { GetRate } from "../features/get-rate.feature"
import express from "express"

export const RateRouter = express.Router()

/* GET current rate */
RateRouter.get('/', function(req, res, next) {
  const getRateFeature = new GetRate()
  const rate = getRateFeature.getRate()
  res.send(rate)
})
