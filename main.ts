// The Printer Finally Answers
//
// The joke: for twelve years this office printer has fed sheet after
// sheet without a word of complaint — 214,003 pages and counting. The
// one time it dares to ask for something itself (ink), the humans
// respond the way they always do: by thumping it. The punchline is the
// printer's flat, literal reading of that thump — as if hitting the
// machine were a step in the manual, a sanctioned troubleshooting
// procedure, rather than what it is: the humans' only idea.

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const LINE: string =
  "In twelve years I have printed 214,003 pages without complaint. Today I asked for ink once, and you hit me like the manual told you to.";

function main(): void {
  // Length gate: the entry line must be 1-240 characters.
  if (LINE.length < 1 || LINE.length > 240) {
    throw new Error(`Line length ${LINE.length} is outside the 1-240 gate`);
  }

  mkdirSync("/output", { recursive: true });

  // Write the line with no trailing newline.
  writeFileSync("/output/entry.txt", LINE, "utf8");

  // Read it back and verify it matches exactly.
  const readBack: string = readFileSync("/output/entry.txt", "utf8");
  if (readBack !== LINE) {
    throw new Error("Verification failed: file content does not match the line");
  }
  if (readBack.endsWith("\n")) {
    throw new Error("Verification failed: file must not end with a newline");
  }

  console.log(`Verified: ${readBack.length} characters`);
  console.log(readBack);
}

main();
