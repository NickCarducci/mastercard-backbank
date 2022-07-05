// a reading, module referencing, and expansion of a rust file source
// https://docs.rs/syn-file-expand/latest/syn_file_expand/fn.read_full_crate_source_code.html

pub fn readfm () -> Result<(), syn_file_expand::Error> {
  let args = Vec::<OsString>::from_iter(std::env::args_os());
  if args.len() != 2 {
      std::process::exit(1);
  }
  let source = syn_file_expand::read_full_crate_source_code(&args[1], |_|Ok(false))?;
  println!("{}", source.into_token_stream() );
   Ok(())
}//https://doc.rust-lang.org/std/result/
