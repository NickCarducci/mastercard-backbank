
// We're able to specify a start event that is called when the WASM is initialized before any
// requests. This is useful if you have some global state or setup code, like a logger. This is
// only called once for the entire lifetime of the worker.
#[event(start)]
pub fn start() {
    utils::set_panic_hook();

    // Change some global state so we know that we ran our setup function.
    //GLOBAL_STATE.store(true, Ordering::SeqCst);
}
