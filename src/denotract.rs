//https://github.com/denoland/rusty_v8/blob/main/examples/hello_world.rs
fn main() {
  let platform = v8::new_default_platform(0, false).make_shared();
  v8::V8::initialize_platform(platform);
  v8::V8::initialize();
  {
    let spank = v8::CreateParams::default();
    let stack = &mut v8::Isolate::new(spank);// &mut mutable
    let scoper = &mut v8::HandleScope::new(stack);
    let context = v8::Context::new(scoper);
    let scope = &mut v8::ContextScope::new(scoper, context);//compiler
    
    let code = v8::String::new(scope, "'Hello' + ' World!'").unwrap();
    let script = v8::Script::compile(scope, code, None).unwrap();
    let result = script.run(scope).unwrap();

    let result = result.to_string(scope).unwrap();
    
    println!("{}", result.to_rust_string_lossy(scope));//this returns like javascript

    //byte from machine[binary]_code
    let c_source = r#"
          let bytes = new Uint8Array([machine_code]);
          let module = new WebAssembly.Module(bytes);
          let instance = new WebAssembly.Instance(module);
          instance.exports.add(3, 4);
        "#;
    let source = v8::String::new(scope, c_source).unwrap();//"string javascript"
    let script = v8::Script::compile(scope, source, None).unwrap();//"compile source"
    let result = script.run(scope).unwrap();//"run script"
    let result = result.to_uint32(scope).unwrap();//"print"
    println!("3 + 4 = {}", result.value());
  }

  unsafe {
    v8::V8::dispose();
  }
  v8::V8::dispose_platform();
}
// too verbose? types allow property asserted type (arguments are parameters by apply)
// stackoverflow.com/questions/61945688/how-to-use-function-return-value-directly-in-rust-println
