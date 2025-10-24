import { fetchAd } from "./streams/fetch-ad.ts";
import { parseAd } from "./streams/parse-ad.ts";
import { stdinTextLines, stdoutText } from "./streams/stdio.ts";
import { toCsv } from "./streams/to-csv.ts";



stdinTextLines
  .pipeThrough( fetchAd )
  .pipeThrough( parseAd )
  .pipeThrough( toCsv )
  .pipeTo( stdoutText );
