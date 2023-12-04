import { argv } from "process";

async function main() {
  import(`./${argv[2]}/index.ts`).then(async (e) => {
    let input = "input";
    if (argv[3] === "test") {
      input = "test";
    }
    let part = "";
    if (argv[4] === "2") {
      part = "_2";
    }
    let text = "";
    try {
      const file = Bun.file(`${argv[2]}/${input}${part}.txt`);
      text = await file.text();
    } catch (error) {
      console.log("defaulting to:");
      console.log(`${argv[2]}/${input}.txt`);
      const file = Bun.file(`${argv[2]}/${input}.txt`);
      text = await file.text();
    }
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
