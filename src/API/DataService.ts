import axios from 'axios'

export default class DataService {
  static async getCurrency() {
    const response = await axios.get(
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
    )
    return response
  }
}
