import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const testFilePath = join(__dirname, "test.txt");
const inputFilePath = join(__dirname, "input.txt");

function solve(filename: string): number {
  const content = readFileSync(filename, "utf-8");
  const lines = content.trim().split("\n");

  const pairs = lines[0].split(",");
  let ans = 0;
  for (const pair of pairs) {
    const [a, b] = pair.split("-").map(Number);
    for (let i = a; i <= b; i++) {
      const string = i.toString();
      for (let j = 0; j < string.length; j++) {
        if (string.length % j === 0) {
          const segment = string.slice(0, j);
          if (segment.repeat(string.length / j) === string) {
            ans += i;
            break;
          }
        }
      }
    }
  }
  return ans; 
}

console.log(`Test Solution: ${solve(testFilePath)}`);
console.log(`Question Solution: ${solve(inputFilePath)}`);
