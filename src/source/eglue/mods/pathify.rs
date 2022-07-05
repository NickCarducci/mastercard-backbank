use crate::mods::utils::iterationforeach;//mods from Cargo.toml?
//each crate has one main function
//with pub uses
//[[bin]] path globals preclude `crate`
//https://stackoverflow.com/a/57453866/11711280
//use crate certain pub members (rust)?
use crate::pubmain::{resultable,stringifu};
pub fn pathify () -> resultable {
  let args = stringifu::from_iter(std::env::args_os());
  if args.len() != 2 {
      std::process::exit(1);//"Reads rust source file, including referred modules and expands them into a single source with all modules inline"
  }
  let mut input_file = std::path::PathBuf::new();
  
  let out = iterationforeach(args, x=>input_file.push(x));

  println!("{}", out);
   Ok(())
}
