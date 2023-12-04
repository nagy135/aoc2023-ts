import { argv } from "process";

async function main() {
  import(`./${argv[2]}/index.ts`).then(async (e) => {
    let input = "input.txt";
    if (argv[3] === "test") {
      input = "test.txt";
    }
    const file = Bun.file(`${argv[2]}/${input}`);
    const text = await file.text();
    const lines = text.split("\n");
    if (lines.at(-1) === "") {
      lines.pop();
    }
    const result = await e.default(lines);
    console.log("================\n", "result: ", result, "\n================");
  });
}

main().catch((e) => {
  console.error(e);
});
