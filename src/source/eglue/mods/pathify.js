use crate::iterationforeach;

fn pathify () -> Result<(), syn_file_expand::Error> {
  let args = Vec::<OsString>::from_iter(std::env::args_os());
  if args.len() != 2 {
      std::process::exit(1);//"Reads rust source file, including referred modules and expands them into a single source with all modules inline"
  }
  let mut input_file = std::path::PathBuf::new();
  
  let out = iterationforeach(args, x=>input_file.push(x));

  println!("{}", out);
   Ok(())
}
