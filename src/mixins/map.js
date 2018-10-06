export default {
  methods: {
    mapBetween(value, minIn, maxIn, minOut, maxOut) {
      return Math.floor((value - minIn) * (maxOut - minOut) / (maxIn - minIn) + minOut)
    },
    mapBetween2Dec(value, minIn, maxIn, minOut, maxOut) {
      let result = (value - minIn) * (maxOut - minOut) / (maxIn - minIn) + minOut
      return Number(result.toFixed(2))
    }
  }
}
