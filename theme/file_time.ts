import { execSync } from "child_process";
import { statSync } from "fs";
import path from "path";

export function get_file_create_and_modify_time(
  file: string | null
): [Date | null, Date | null] {
  if (!file) return [null, null];
  // create_time: min(git insert time, file create time)
  // modify_time: file no changes ? git modify time : file modify time

  const stat = statSync(file);
  if (stat) [stat.ctime, stat.mtime];
  const output = execSync(
    `git log --follow --format='%ad' --date=iso8601 -- '${file}'`,
    {
      cwd: path.dirname(file),
    }
  )
    .toString("utf-8")
    .trim()
    .split("\n");
  // remove empty lines
  output.filter((line) => line.length > 0);
  if (output.length === 0) return [stat.birthtime, stat.mtime];
  let modified = false;
  try {
    execSync(`git diff --quiet HEAD -- '${file}'`);
  } catch (e) {
    modified = true;
  }
  return [
    new Date(output[output.length - 1]),
    modified ? stat.mtime : new Date(output[0]),
  ];
}
