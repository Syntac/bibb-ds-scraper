
# Purpose

The purpose of this tool is to scrape information about dual study programs from Germany's [Federal Institute for Vocational Education and Training](https://www.bibb.de/), specifically from their [dual study search engine](https://www.bibb.de/dienst/ausbildungplus/de/dualer_studiengang/suche), into a csv file. I was considering applying for a dual study program but found that it would be helpful to filter, sort, and compare search results (ads) by more data-points than are available in the search engine. For example, it would be helpful have program start dates, program duration, degree type, available spots, and application deadlines available.


# Approach


### Task
To collect the wanted data, one has to first search for the relevant study programs and then open the dedicated information page for each ad individually.


### Static vs Dynamic Scraping
At first I intended to use [puppeteer](https://pptr.dev/) to scrape the pages. After inspecting the network traffic however, I found that it wouldn't be necessary to scrape in full browser environment. The search uses a simple api endpoint that can be called directly and the ad pages themselves are (mostly) static.


### Architecture
I split the tool in two parts:
1. One that, given a search term, fetches the search results and outputs their respective urls to stdout.
2. One that reads urls from stdin, fetches and scrapes the corresponding static htmls, and outputs the scraped data as csv to stdout.

Splitting the tool in two allows to run them independently and thus a critical error during parsing won't require to rerun the search, provided the urls have been saved to a file.

The search tool is found in the [search](search/) folder, the parsing tool in the [parse](parse/) folder.

### Error handling

Since the tool is intended for single use, robustness isn't a high priority. Errors don't have to be handled gracefully in most cases, as long as they don't appear "on a sunny day".
However, since not all ads contain the same data-points, not finding a data-point on a certain ad mustn't be a critical error. The parse tool should print an info message to stderr but not fail.

### Testing

I won't include any automated tests with the tool. Since the tool is meant for single use with me as the only user, it is sufficient for me to validate it's functionality through manual tests and demonstrations.
Were I to share the tool with other users and continue development on it, I'd include automated tests.

# How to run

### Search Tool
```bash
deno task search [searchTerm]
```
It will print a list of ad-urls to stdout.

### Parse Tool
```bash
deno task parse
```
It reads the ad-urls from stdin and writes the resulting csv to stdout.

### Example
```bash
deno task search "Maschinenbau" > sample.urls 2> sample.log
deno task parse < sample.urls > sample.csv 2>> sample.log
```

See [sample.urls](sample.urls), [sample.csv](sample.csv) and [sample.log](sample.log).