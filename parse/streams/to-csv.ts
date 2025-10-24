import { CsvStringifyStream } from "@std/csv";
import { Interface2, Interface2Keys } from "./types.ts";

export const toCsv : TransformStream<Interface2, string>
    = new CsvStringifyStream({ columns: ["id", "url", ...Interface2Keys ] })


