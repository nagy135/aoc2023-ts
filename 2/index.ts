export default async function main(lines: string[]) {
  return first(lines);
  // return second(lines);
}

function first(lines: string[]) {
  const all: number[] = [];
  const losers: number[] = [];
  for (const line of lines) {
    const res = line.match(/(.*): (.*)/);
    if (!res) throw Error("cant parse line");

    const res2 = res[1].match(/\w+ (\d+)/);
    if (!res2) throw Error("cant parse line");

    const gameNum = parseInt(res2[1]);
    const gameLine = res[2];
    all.push(gameNum);
    gameLine.split(";").map((setReveal) => {
      const bagStart: Record<string, number> = {
        red: 12,
        green: 13,
        blue: 14,
      };
      setReveal.split(", ").map((cube) => {
        const res3 = cube.match(/(\d+) (\w+)/);
        if (!res3) throw Error("cant parse line");
        const [_, amount, color] = res3;
        if (color in bagStart) {
          bagStart[color] -= parseInt(amount);
        }
      });

      if (Object.values(bagStart).some((val) => val < 0)) losers.push(gameNum);
    });
  }
  return all
    .filter((e) => !losers.includes(e))
    .reduce((a, b) => a + b, 0)
    .toString();
}
