const isApi = false

export default {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 7000,
  tapiHost: isApi ? process.env.APIHOST || 'localhost' : null,
  apiPort: isApi ? process.env.APIPORT : null,
  development: process.env.NODE_ENV !== 'production' ? true : false
}
