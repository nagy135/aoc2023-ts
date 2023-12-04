export default async function main(lines: string[]) {
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

function is_numeric(str: string) {
  return /^\d+$/.test(str);
}
