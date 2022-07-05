use crate::mods::utils::iterationforeach;//mods from Cargo.toml?
//each crate has one main function
//with pub uses
//[[bin]] path globals preclude `crate`
//https://stackoverflow.com/a/57453866/11711280
//use crate certain pub members (rust)?
use crate::pubmain::{resultable,arguments,null};
use crate::pubmain::dev::{array};
pub fn pathify () -> resultable {
  let mut input_file = array();
  fn iteration () -> null {
    input_file.push();
  }
  let out = iterationforeach(arguments, iteration);
  println!("{}", out);
   Ok(())
}
