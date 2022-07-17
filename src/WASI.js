//https://blog.cloudflare.com/announcing-wasi-on-workers/
import { WASI } from '@cloudflare/workers-wasi';
import mywasm from '../a.out.wasm';

export default async function () {
  const wasi = new WASI();
  const instance = new WebAssembly.Instance(mywasm, {
     wasi_snapshot_preview1: wasi.wasiImport
  });
  return await wasi.start(instance);
}
