export default async function main(lines: string[]) {
  // return first(lines);
  return second(lines);
}

function first(lines: string[]) {
  let sum = 0;
  for (const line of lines) {
    const collector: number[] = [];
    for (let index = 0; index < line.length; index++) {
      const char = line[index];
      if (is_numeric(char)) {
        collector.push(Number(char));
      }
    }
    sum += parseInt(`${collector.at(0) ?? 0}${collector.at(-1) ?? 0})`, 10);
  }
  return sum.toString();
}

function collect(line: string, direction: "start" | "end"): number | undefined {
  const list = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  let res: number | undefined = undefined;
  list.map((num, i) => {
    if (direction === "start") {
      if (line.startsWith(num)) {
        res = i + 1;
      }
    } else if (direction === "end") {
      if (line.endsWith(num)) {
        res = i + 1;
      }
    }
  });
  return res;
}

function second(lines: string[]) {
  let sum = 0;
  for (const line of lines) {
    let leftVal: number | undefined = undefined;
    let rightVal: number | undefined = undefined;
    for (let i = 0; i < line.length; i++) {
      const left = line.slice(i);
      const right = line.slice(0, line.length - i);

      if (!leftVal) leftVal = collect(left, "start");
      if (!rightVal) rightVal = collect(right, "end");

      const char = line.at(i) as string; // always hits
      const charRight = line.at(line.length - i - 1) as string; // always hits

      if (!leftVal) leftVal = is_numeric(char) ? parseInt(char) : undefined;
      if (!rightVal)
        rightVal = is_numeric(charRight) ? parseInt(charRight) : undefined;
    }

    sum += parseInt(`${leftVal}${rightVal}`, 10);
  }
  return sum.toString();
}

function is_numeric(str: string) {
  return /^\d+$/.test(str);
}
