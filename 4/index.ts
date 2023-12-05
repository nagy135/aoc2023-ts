export default async function main(lines: string[]) {
  return first(lines);
  // return second(lines);
}

function first(lines: string[]) {
  let result = 0;
  for (const line of lines) {
    const res = line.match(/Card\s*(\d+): (.*)/);
    if (!res) throw Error("cant parse line");
    const [_, _cardNum, card] = res;
    const parts = card.split(" | ");
    const winners = new Set(
      parts[0]
        .split(" ")
        .filter((e) => e != "")
        .map((e) => Number(e)),
    );
    const mine = new Set(
      parts[1]
        .split(" ")
        .filter((e) => e != "")
        .map((e) => Number(e)),
    );

    let intersect = new Set([...winners].filter((x) => mine.has(x)));
    if (intersect.size) result += Math.pow(2, intersect.size - 1);
  }
  return result.toString();
}
