# Trackbuster 3000

[![npm version](https://badge.fury.io/js/trackbuster3000.svg)](https://badge.fury.io/js/trackbuster3000)

Removes query parameters used for tracking (such as `fbclid` and `utm_source`) from URLs. 

## Installation
```
npm install trackbuster3000
```

## Usage

```javascript
const filter = require('trackbuster3000')
const filtered = filter.removeTrackingParams('http://example.com?some=param&fbclid=evil')
```

## Result
```
http://example.com?some=param
```
