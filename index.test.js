const filter = require('./index')

describe("only query params from the no-no list are removed", () => {
   ['utm_whatever', 'fbclid', 'oly_whatever', '_openstat', 'mkt_tok'].forEach((param) => {
      const orig = new URL(`https://example.com?${param}=yourprivacyarebelongtous&something=whatever`)
      test(`${param} is bad`, () => {
         const filtered = new URL(filter.removeTrackingParams(orig.toString()))
         expect(filtered).not.toBe(orig)
         expect(filtered.searchParams.get('something')).toBe('whatever')
      })
   })

   test('url with no query params is left untouched', () => {
      const orig = new URL(`https://example.com`)
      const filtered = new URL(filter.removeTrackingParams(orig.toString()))
      expect(filtered).toStrictEqual(orig)
   })

   test('url with non-tracking query params only is left untouched', () => {
      const orig = new URL(`https://example.com?first=1&second=2`)
      const filtered = new URL(filter.removeTrackingParams(orig.toString()))
      expect(filtered).toStrictEqual(orig)
   })
})
