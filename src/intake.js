const suffices = [".js", ".mjs", ""];
const impor = async (file) => {
  var works;
  suffices.forEach(function receipt(sfx = arguments[0]) {
    works = import(`${file}${sfx}`)
      .then()
      .catch(() => receipt(suffices[suffices.indexOf(sfx)] + 1));
  });
  return await new Promise((resolve) => {
    works && resolve(works);
  });
};

export const Intake = async (file) =>
  await impor(file).then((Dependencies) => {
    Object.keys(Dependencies).forEach((arg) => {
      Dependencies[arg] = Dependencies;
    });
    return new Promise((resolve) =>
      resolve({ default: Dependencies, ...Dependencies })
    );
  });
