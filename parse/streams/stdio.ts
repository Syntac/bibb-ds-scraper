import { TextLineStream } from "@std/streams/text-line-stream";

//stdin
export const stdinTextLines = Deno.stdin.readable
    .pipeThrough( new TextDecoderStream() )
    .pipeThrough( new TextLineStream() )

// stdout
const encoder = new TextEncoderStream();
encoder.readable
    .pipeTo( Deno.stdout.writable );

export const stdoutText = encoder.writable;