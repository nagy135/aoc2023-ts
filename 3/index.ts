export default async function main(lines: string[]) {
  // return first(lines);
  return second(lines);
}

type Label1 = {
  x: number;
  y: number;
  number: number;
};

type Tag1 = {
  x: number;
  y: number;
};
function first(lines: string[]) {
  const labels: Label1[] = [];
  const tags: Tag1[] = [];
  let scanner = "";
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const char = lines[y][x];
      if (is_numeric(char)) {
        scanner += char;
      } else if (scanner !== "") {
        labels.push({
          x: x - scanner.length,
          y,
          number: parseInt(scanner, 10),
        });
        scanner = "";
      }
      if (!is_numeric(char) && char !== ".") {
        tags.push({
          x,
          y,
        });
      }
    }
    if (scanner !== "") {
      labels.push({
        x: lines[y].length - scanner.length,
        y,
        number: parseInt(scanner, 10),
      });
      scanner = "";
    }
  }

  const sumArr: number[] = [];
  for (const label of labels) {
    let found = false;
    for (const tag of tags) {
      if (
        !found &&
        label.x - 1 <= tag.x &&
        label.x + label.number.toString().length >= tag.x &&
        label.y - 1 <= tag.y &&
        label.y + 1 >= tag.y
      ) {
        found = true;
        sumArr.push(label.number);
      }
    }
  }
  return sumArr.reduce((a, b) => a + b, 0).toString();
}

type Label = {
  x: number;
  y: number;
  number: number;
  tag: Tag | null;
};

type Tag = {
  x: number;
  y: number;
  char: string;
};

function second(lines: string[]) {
  const labels: Label[] = [];
  const tags: Tag[] = [];
  let scanner = "";
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const char = lines[y][x];
      if (is_numeric(char)) {
        scanner += char;
      } else if (scanner !== "") {
        labels.push({
          x: x - scanner.length,
          y,
          number: parseInt(scanner, 10),
          tag: null,
        });
        scanner = "";
      }
      if (!is_numeric(char) && char !== ".") {
        tags.push({
          x,
          y,
          char,
        });
      }
    }
    if (scanner !== "") {
      labels.push({
        x: lines[y].length - scanner.length,
        y,
        number: parseInt(scanner, 10),
        tag: null,
      });
      scanner = "";
    }
  }

  for (const label of labels) {
    let found = false;
    for (const tag of tags) {
      if (
        !found &&
        label.x - 1 <= tag.x &&
        label.x + label.number.toString().length >= tag.x &&
        label.y - 1 <= tag.y &&
        label.y + 1 >= tag.y
      ) {
        found = true;
        label.tag = tag;
      }
    }
  }
  const ratios: number[] = [];
  for (const tag of tags) {
    if (tag.char === "*") {
      const numbers: number[] = [];
      for (const label of labels) {
        if (label.tag === tag) {
          numbers.push(label.number);
        }
      }
      if (numbers.length == 2) {
        ratios.push(numbers[0] * numbers[1]);
      }
    }
  }
  return ratios.reduce((a, b) => a + b, 0).toString();
}

function is_numeric(str: string) {
  return /^\d+$/.test(str);
}
