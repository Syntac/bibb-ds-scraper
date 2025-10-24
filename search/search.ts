import { DOMParser } from "@b-fuze/deno-dom";
import { fetchSearchResults, SearchResult } from "./api.ts";

/**
 * Searches for ads using a given term.
 * @param searchTerm term to search for
 * @reutrns ad-urls found in the search
 */
export async function* searchStudyAds ( searchTerm : string ) : AsyncGenerator<string> {

    const parser = new DOMParser();

    for await( const searchResult of fetchSearchResults( searchTerm ) ) {
        yield parseSearchResult( parser, searchResult );
    };
    
}

// selector used to find ad-url in search result
const CSS_URL_SELECTOR = "a[href^='https://www.bibb.de/dienst/ausbildungplus/de/dualer_studiengang/ansehen/']";

/**
 * Parses the ad-url from a given search result entry.
 * @param parser an instance of a DOMParser (to promote re-use)
 * @param row a search result entry representing an ad.
 * @returns the ad-url parsed from the row
 */
function parseSearchResult( parser: DOMParser, searchResult: SearchResult ) : string {

    const dom = parser.parseFromString( searchResult.html, "text/html" );

    const anchors = dom.querySelectorAll( CSS_URL_SELECTOR );
    if( anchors.length !== 1 ) throw new Error( "Failed to find unique ad url in row entry." );

    return anchors[0].getAttribute( "href" )!; // since we queried for anchors with href, it shan't be null

}