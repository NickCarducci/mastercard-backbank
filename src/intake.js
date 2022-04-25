const suffices = [".js", ".mjs", ""];
const impor = (file) => {
  var works;
  suffices.forEach(function receipt(sfx = arguments[0]) {
    works = import(`${file}${sfx}`)
      .then()
      .catch(() => receipt(suffices[suffices.indexOf(sfx)] + 1));
  });
  return new Promise((resolve) => {
    works && resolve(works);
  });
};

export const Intake = (file) =>
  impor(file).then((Dependencies) => {
    Object.keys(Dependencies).forEach((arg) => {
      Dependencies[arg] = Dependencies;
    });
    return { default: Dependencies, ...Dependencies };
  });
