import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const testFilePath = join(__dirname, "test.txt");
const inputFilePath = join(__dirname, "input.txt");

function solve(filename: string): number {
  const content = readFileSync(filename, "utf-8");
  const lines = content.trim().split("\n");
  const wrap = (n: number, max: number) => ((n % max) + max) % max;

  let score = 0;
  let pos = 50;

  for (const line of lines) {
    const direction = line[0];
    const steps = parseInt(line.slice(1));

    if (direction === "R") {
      // Going right: count when we wrap from 99 → 0
      score += Math.floor((pos + steps) / 100) - Math.floor(pos / 100);
      pos = wrap(pos + steps, 100);
    } else {
      // Going left: count when we wrap from 1 → 0 (entering 0)
      score += Math.ceil(pos / 100) - Math.ceil((pos - steps) / 100);
      pos = wrap(pos - steps, 100);
    }
  }

  return score;
}

console.log(`Test Solution: ${solve(testFilePath)}`);
console.log(`Question Solution: ${solve(inputFilePath)}`);
