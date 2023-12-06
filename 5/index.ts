export default async function main(lines: string[]) {
  return first(lines);
  // return second(lines);
}

function first(lines: string[]) {
  const mapper: Record<string, Record<string, [string, string, number][]>> = {};
  const firstLine = lines[0].match(/seeds: ([\d\s]+)/);
  const seeds = firstLine?.[1].split(" ") ?? [];
  let map: null | [string, string] = null;
  const steps: string[] = [];
  for (const line of lines.slice(2)) {
    if (map === null) {
      const mappingMatch = line.match(/([\w]+)-to-([\w]+) map:/);
      const from = mappingMatch?.[1];
      const to = mappingMatch?.[2];
      if (to) steps.push(to);
      if (from && to) map = [from, to];
    } else if (line === "") map = null;
    else {
      const numbersMatch = line.match(/([\d]+) ([\d]+) ([\d]+)/);
      if (numbersMatch === null) continue;
      const [_, toStr, fromStr, amountStr] = numbersMatch;
      const amountNum = parseInt(amountStr);
      const [from, to] = map;
      if (from in mapper) {
        if (to in mapper[from]) {
          mapper[from][to].push([fromStr, toStr, amountNum]);
        } else {
          mapper[from][to] = [[fromStr, toStr, amountNum]];
        }
      } else {
        mapper[from] = {
          [to]: [[fromStr, toStr, amountNum]],
        };
      }
    }
  }
  let lowest = Number.POSITIVE_INFINITY;
  for (const seed of seeds) {
    let input = seed;
    let from: string = "seed";
    let result: string = "";
    for (const target of steps) {
      if (from in mapper) {
        if (target in mapper[from]) {
          result = input;
          const mappings = mapper[from][target] ?? [];
          for (const [i, o, a] of mappings) {
            const inputNum = parseInt(input);
            const parsedI = parseInt(i);
            const parsedO = parseInt(o);
            if (parsedI < inputNum && inputNum < parsedI + a) {
              result = (parsedO + (inputNum - parsedI)).toString();
              break;
            }
          }
          from = target;
          input = result;
        }
      }
    }
    if (parseInt(result) < lowest) lowest = parseInt(result);
  }
  return lowest.toString();
}
