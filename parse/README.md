The parse tool takes urls of ads on stdin and prints the parsed ad information in csv format to stdout.
Debug info is on stderr.

It's meant to consume the output of the search tool.
When combining multiple search results, it's recommended to pipe them through ` | sort | uniq | ` first before passing them to the parse tool, in order to remove duplicates.

Since many of the datapoints in the ads are optional, the tool will print a message when a datapoint couldn't be parsed but won't fail and simply leave the cell in the CSV blank.

