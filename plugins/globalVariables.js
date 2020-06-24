export default (context, inject) => {
  const store = {
    debug: true,
    state: {
      discardTouch: false
    },
    discardTouch(newValue) {
      if (this.debug) console.log('set discard touch to', newValue)
      this.state.discardTouch = newValue
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
