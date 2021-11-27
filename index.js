const removeTrackingParams = (urlString) => {
   const url = new URL(urlString)
   Array.from(url.searchParams.entries())
      .filter(entry => isTracking(entry[0]))
      .forEach(entry => url.searchParams.delete(entry[0]))
   return url.toString()
}

const isTracking = (paramName) => paramName.startsWith('utm_')
   || paramName.startsWith('stm_')
   || paramName.startsWith('mc_')
   || paramName.startsWith('oly_')
   || paramName.startsWith('_hs')
   || paramName === 'fbclid'
   || paramName === 'igshid'
   || paramName === 'mkt_tok'
   || paramName === 'otc'
   || paramName === 'wickedid'
   || paramName === '_openstat'
   || paramName === 'yclid'
   || paramName === 'ICID'
   || paramName === 'rb_clickid'

module.exports = {
   removeTrackingParams
}
