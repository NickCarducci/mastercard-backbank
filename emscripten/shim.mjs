// import the emscripten glue code
import emscripten from './build/module.js'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

// '.wasm' as global scope-bound module of WASM instance, from emscripten('instantiateWasm')
let emscripten_module = new Promise((resolve, reject) => {
  emscripten({
    instantiateWasm(info, receive) {
      let instance = new WebAssembly.Instance(wasm, info)
      receive(instance)
      return instance.exports
    },
  }).then(module => {
    resolve({
      init: module.cwrap('init', 'number', ['number']),
      resize: module.cwrap('resize', 'number', ['number', 'number']),
      module: module,
    })
  })
})

async function handleRequest(event) {
  let request = event.request
  let response = await fetch(request)

  let newResponse = new Response(resultBytes, response)
  newResponse.headers.set('Content-Type', 'image/jpeg')

  // Return the response.
  return newResponse
}
