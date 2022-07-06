use crate::bupkis::{resultable,arguments,null,mods,dev}
use mods::utils::iterationforeach;//mods from Cargo.toml?
//each crate has one main function
//with pub uses
//[[bin]] path globals preclude `crate`
//https://stackoverflow.com/a/57453866/11711280
//use crate certain pub members (rust)?
use dev::{pathbuf};
pub fn pathify () -> resultable {
  let mut input_file = pathbuf();
  fn iteration () -> null {
    input_file.push(arguments[0]);
  }
  let out = iterationforeach(arguments, iteration);
  println!("{}", out);
   Ok(())
}
