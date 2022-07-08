mod bupkis;
use bupkis::Stringifu; 

//this is for command line. varargs is only in c, but we can use macro rules
//https://stackoverflow.com/a/57454769/11711280
/*
macro_rules! arguments {
    ($($args:expr),*) => {{
        $(
            println!("{}", $args);
        )*
    }}
}

fn main() {
    arguments!(1, 2, "Hello");
}
*/
pub fn arguments() -> Stringifu {
  let arguments = Stringifu::from_iter(std::env::args_os());
  if arguments.len() != 2 {
    std::process::exit(1);
  }
  while !args.is_empty() {
    //forwhile
    let &i = args.remove(0).to_lowercase();
    if env::args().collect() == i {
      arguments.push(&i);
    }
  }
  //https://stackoverflow.com/questions/56880696/how-do-i-run-a-command-that-can-take-an-unspecified-number-of-env-arguments
  println!("{}", arguments); //env::args().collect::<Vec<_>>();
}
