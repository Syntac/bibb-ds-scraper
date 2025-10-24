
# Purpose

The purpose of this tool is to scrape information about dual study programs from Germany’s [Federal Institute for Vocational Education and Training](https://www.bibb.de/), specifically from their [dual study search engine](https://www.bibb.de/dienst/ausbildungplus/de/dualer_studiengang/suche), into a CSV file. I was considering applying for a dual study program but found that it would be helpful to filter, sort, and compare search results (ads) using more data points than are available in the search engine. For example, it would be useful to have program start dates, program duration, degree type, available spots, and application deadlines available.

# Approach


### Task

To collect the desired data, one must first search for the relevant study programs and then open the dedicated information page for each ad individually.

### Static vs Dynamic Scraping

At first, I intended to use [Puppeteer](https://pptr.dev/) to scrape the pages. After inspecting the network traffic, however, I found that it wasn’t necessary to scrape in a full browser environment. The search uses a simple API endpoint that can be called directly, and the ad pages themselves are (mostly) static.

### Architecture

I split the tool into two parts:

1. One that, given a search term, fetches the search results and outputs their respective URLs to stdout.
2. One that reads URLs from stdin, fetches and scrapes the corresponding static HTML pages, and outputs the scraped data as CSV to stdout.

Splitting the tool into two parts allows them to run independently, so a critical error during parsing won’t require rerunning the search, provided the URLs have been saved to a file.

The search tool is in the [search](search/) folder, and the parsing tool is in the [parse](parse/) folder.

### Error Handling

Since the tool is intended for single use, robustness isn’t a high priority. Errors don’t need to be handled gracefully in most cases, as long as they don’t occur “on a sunny day.” However, since not all ads contain the same data points, missing data in a certain ad must not be a critical error. The parse tool should print an info message to stderr but not fail.

### Testing

I won’t include any automated tests with the tool. Since it’s meant for single use with me as the only user, manual validation through testing and demonstrations is sufficient to me. If I were to share the tool with others and continue development, I’d include automated tests.

# How to Run

### Search Tool

```bash
deno task search [searchTerm]
```

Prints a list of ad URLs to stdout.

### Parse Tool

```bash
deno task parse
```

Reads ad URLs from stdin and writes the resulting CSV to stdout.

### Example

```bash
deno task search "Maschinenbau" > sample.urls 2> sample.log
deno task parse < sample.urls > sample.csv 2>> sample.log
```

See [sample.urls](sample.urls), [sample.csv](sample.csv), and [sample.log](sample.log).
