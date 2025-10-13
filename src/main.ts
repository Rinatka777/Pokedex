import { startREPL } from "./repl.js";
import {initState} from "./state";

function main() {
  startREPL();
  const state = initState();
}

main();