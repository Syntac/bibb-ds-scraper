import { fetchSearchXhrResponse } from "./api/request.ts";
import { parseResponse, SearchResponse, SearchResponseRow } from "./api/response.ts";


// type to add a bit more context compared to a SearchResponseRow
export type SearchResult = {
  html: string;
};

/**
 * Searches for ads using a given term.
 * Paginates through the individual search result pages.
 * @param searchTerm the term to search with
 * @returns the results of the search, representing ads
 */
export async function* fetchSearchResults ( searchTerm: string ) : AsyncGenerator<SearchResult> {

    const { pages } = await fetchSearchResultPage( searchTerm, 1 );
    
    for( let page = 1; page <= pages; page++ ) { // we fetch the first page again here. While this is wasteful, it simplifies the code

      const { rows } = await fetchSearchResultPage( searchTerm, page );

      for( const row of rows ) yield searchResultFromRow( row );
    
    }

}

function searchResultFromRow ( row: SearchResponseRow ) : SearchResult {
  return { html: row.values[0] };
}

/**
 * Fetches a given page searching for a given term and parses the response.
 * Ensures the response matches the expected format.
 * @param searchTerm the term to search for
 * @param page which page to request
 * @returns the parsed SearchResponse
 */
async function fetchSearchResultPage ( searchTerm: string, page: number ) : Promise<SearchResponse> {

  console.error( "[DEBUG] Fetching search page", page );

  const response = await fetchSearchXhrResponse( searchTerm, page );

  return await parseResponse(response);

}