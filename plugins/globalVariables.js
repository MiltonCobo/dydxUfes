export default (context, inject) => {
  const PlotlyConfig = { MathJaxConfig: 'local' }

  const store = {
    debug: true,
    state: {
      discardTouch: false,
      windowWidth: null,
      windowHeight: null
    },
    discardTouch(newValue) {
      if (this.debug) console.log('set discard touch to', newValue)
      this.state.discardTouch = newValue
    },

    setWindowWidth(newValue) {
      if (this.debug) console.log('set global windowWidth to', newValue)
      this.state.windowWidth = newValue
    },

    setWindowHeight(newValue) {
      if (this.debug) console.log('set global windowHeight to', newValue)
      this.state.windowHeight = newValue
    }
    // clearMessageAction () {
    //   if (this.debug) console.log('clearMessageAction triggered')
    //   this.state.discardTouch = ''
    // }
  }

  // Inject $hello(msg) in Vue, context and store.
  inject('store', store)
  // For Nuxt <= 2.12, also add 👇
  // context.$store = store
}
