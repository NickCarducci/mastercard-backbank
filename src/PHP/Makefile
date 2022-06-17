# https://blog.cloudflare.com/cloudflare-worker-with-webassembly-and-haskell/
CFLAGS=-O2 -Wall

# dummy headers in '/stubs'
NO_STANDARD_LIBS=-nostdlib -nostdinc -isystemstubs

# import WebAssembly.Memory in worker.js or DurableObjectExample.mjs
WASM_LINKER_FLAGS=-Wl,--no-entry -Wl,--import-memory -Wl,--export-dynamic

backbank.wasm: exec.c bootstrap.h
	clang $(CFLAGS) --target=wasm32-unknown-unknown-wasm \
	    $(NO_STANDARD_LIBS) $(WASM_LINKER_FLAGS) \
	    exec.c -o backbank.wasm

clean:
	rm -f backbank.wasm

# If you want to use `make upload`, you'll need to store your API keys in this
# file. This is a simple text file with three lines like:
#    ACCOUNT_ID="<account id>"
#    API_EMAIL="<account email>"
#    API_KEY="<key>"
# This creates a script in your account called "wasm-demo". Only enterprise
# zones can have multiple, named scripts. If you do not have an enterprise
# account, you can upload through the single-script API endpoint with the
# same format, but as this will replace your existing script, we don't
# provide a shortcut for it here.
CF_KEYFILE=.cf-keys
upload: backbank.wasm
	(. $(CF_KEYFILE) && curl -X PUT -H "X-Auth-Email: $$API_EMAIL" -H "X-Auth-Key: $$API_KEY" \
	  "https://api.cloudflare.com/client/v4/accounts/$$ACCOUNT_ID/workers/scripts/wasm-demo" \
		-F metadata=@worker-metadata.json \
		-F script=@emscript.js \
		-F wasm=@backbank.wasm)
