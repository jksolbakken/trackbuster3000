const filter = require('./index')

describe("params from the no-no list are removed", () => {
   ['utm_whatever', 'fbclid', 'oly_whatever', '_openstat', 'mkt_tok'].forEach((param) => {
      const orig = new URL(`https://example.com?${param}=yourprivacyarebelongtous&something=whatever`)
      test(`${param} is bad`, () => {
         const filtered = new URL(filter.removeTrackingParams(orig.toString()))
         expect(filtered.searchParams.get('fbclid')).toBeNull()
         expect(filtered.searchParams.get('something')).toBe('whatever')
      })
   })

   const orig = new URL(`https://example.com?fbclid=evil&utm_source=bad&something=whatever`)
   test(`multiple no-no params are also bad`, () => {
      const filtered = new URL(filter.removeTrackingParams(orig.toString()))
      expect(filtered.searchParams.get('fbclid')).toBeNull()
      expect(filtered.searchParams.get('utm_source')).toBeNull()
      expect(filtered.searchParams.get('something')).toBe('whatever')
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
