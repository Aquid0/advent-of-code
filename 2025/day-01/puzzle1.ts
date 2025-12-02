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
  let count = 50;

  for (const line of lines) {
    const direction = line[0];
    const steps = parseInt(line.slice(1));
    if (direction === "L") {
      count = wrap(count - steps, 100);
    } else {
      count = wrap(count + steps, 100);
    }

    if (count === 0) {
      score += 1;
    }
  }

  return score;
}

console.log(`Test Solution: ${solve(testFilePath)}`);
console.log(`Question Solution: ${solve(inputFilePath)}`);
