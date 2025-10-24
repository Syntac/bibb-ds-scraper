
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

To run the **search tool**, run `deno task search [searchTerm]`.
<br>It will print a list of ad-urls to stdout.

To run the **parse tool**, run `deno task parse`.
<br>It reads the ad-urls from stdin and writes the resulting csv to stdout.
<br>**Example usage:** `deno task parse < sample.urls > sample.csv`

## Example
```bash
deno task search "Maschinenbau - Allgemeiner Maschinenbau" > sample.urls;
deno task parse < sample.urls > sample.csv
```

See [sample.urls](sample.urls) and [sample.csv](sample.csv).

#### Log output with debug and info logs:
```
Task search deno task --cwd="./search" start "Maschinenbau - Allgemeiner Maschinenbau"
Task start deno run --allow-net=www.bibb.de:443 main.ts "Maschinenbau - Allgemeiner Maschinenbau"
[DEBUG] Fetching search page 1
[DEBUG] Fetching search page 1

Task parse deno task --cwd="./parse" start
Task start deno run --allow-net=www.bibb.de:443 main.ts
[DEBUG] Fetching url "https://www.bibb.de/dienst/ausbildungplus/de/dualer_studiengang/ansehen/10834"
[DEBUG] Parsing html of url "https://www.bibb.de/dienst/ausbildungplus/de/dualer_studiengang/ansehen/10834"
[INFO] Failed to parse key "Weitere Anmerkungen zum dualen Studiengang" 
         Error: Failed to find unique strong tag with textContent "Weitere Anmerkungen zum dualen Studiengang"
[INFO] Failed to parse key "Plätze zum nächsten Bewerbungstermin" 
         Error: Failed to find unique strong tag with textContent "Plätze zum nächsten Bewerbungstermin"
[INFO] Failed to parse key "Internationalität" 
         Error: Failed to find unique h3 tag with textContent "Internationalität"
[DEBUG] Fetching url "https://www.bibb.de/dienst/ausbildungplus/de/dualer_studiengang/ansehen/13786"
[DEBUG] Parsing html of url "https://www.bibb.de/dienst/ausbildungplus/de/dualer_studiengang/ansehen/13786"
[INFO] Failed to parse key "Studiengang existiert seit" 
         Error: Failed to find unique strong tag with textContent "Studiengang existiert seit"
[INFO] Failed to parse key "Weitere Anmerkungen zum dualen Studiengang" 
         Error: Failed to find unique strong tag with textContent "Weitere Anmerkungen zum dualen Studiengang"
[INFO] Failed to parse key "Bewerbungsfrist" 
         Error: Failed to find unique strong tag with textContent "Bewerbungsfrist"
[INFO] Failed to parse key "Plätze zum nächsten Bewerbungstermin" 
         Error: Failed to find unique strong tag with textContent "Plätze zum nächsten Bewerbungstermin"
[INFO] Failed to parse key "Internationalität" 
         Error: Failed to find unique h3 tag with textContent "Internationalität"
[DEBUG] Fetching url "https://www.bibb.de/dienst/ausbildungplus/de/dualer_studiengang/ansehen/14946"
[DEBUG] Parsing html of url "https://www.bibb.de/dienst/ausbildungplus/de/dualer_studiengang/ansehen/14946"
[INFO] Failed to parse key "Weitere Anmerkungen zum dualen Studiengang" 
         Error: Failed to find unique strong tag with textContent "Weitere Anmerkungen zum dualen Studiengang"
[INFO] Failed to parse key "Bewerbungsfrist" 
         Error: Failed to find unique strong tag with textContent "Bewerbungsfrist"
[INFO] Failed to parse key "Internationalität" 
         Error: Failed to find unique h3 tag with textContent "Internationalität"
[DEBUG] Fetching url "https://www.bibb.de/dienst/ausbildungplus/de/dualer_studiengang/ansehen/17278"
[DEBUG] Parsing html of url "https://www.bibb.de/dienst/ausbildungplus/de/dualer_studiengang/ansehen/17278"
[INFO] Failed to parse key "Studierende in diesem Studiengang" 
         Error: Failed to find unique strong tag with textContent "Studierende in diesem Studiengang"
[INFO] Failed to parse key "Weitere Anmerkungen zum dualen Studiengang" 
         Error: Failed to find unique strong tag with textContent "Weitere Anmerkungen zum dualen Studiengang"
[INFO] Failed to parse key "Plätze zum nächsten Bewerbungstermin" 
         Error: Failed to find unique strong tag with textContent "Plätze zum nächsten Bewerbungstermin"
[INFO] Failed to parse key "Internationalität" 
         Error: Failed to find unique h3 tag with textContent "Internationalität"
```