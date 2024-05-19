import axios from 'axios'
import { GET_RATE_URL, VALCODES } from '../constants'

export class GetRate {
  async getRate (valcode?: VALCODES): Promise<number> {
    const rateResponse: IGetRateResponse[] = await axios.get(GET_RATE_URL, {
      params: {
        valcode: valcode ?? VALCODES.USD_VALCODE,
        json: true
      }
    })

    return rateResponse[0].data.rate
  }
}

interface IGetRateResponse {
  data: {
    r030: number,
    txt: string
    rate: number
    cc: string
    exchangedate: string
  }
}
