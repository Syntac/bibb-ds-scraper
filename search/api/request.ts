import { REQUEST_BODY_DEFAULTS, SEARCH_HEADERS, SEARCH_PARAM_DEFAULTS, SEARCH_URL } from "./request_consts.ts";

/**
 * Sends a search xhr.
 * Requests a given page of results searching for a given term.
 * @param searchTerm the term to search for
 * @param page which page of the search results to retrieve
 * @returns the search xhr response
 */
export function fetchSearchXhrResponse ( searchTerm: string, page: number ) : Promise<Response> {
  return fetch( SEARCH_URL, {
    "headers": SEARCH_HEADERS,
    "body": JSON.stringify( createRequestBody( searchTerm, page ) ),
    "method": "POST",
    // "mode": "cors",
    // "credentials": "include"
  } );
}

// helper functions for creating parts of the xhr used to fetch search results

function createRequestBody ( searchTerm: string, page: number ) {
    return {
        page,
        searchFields: JSON.stringify( createRequestBodySearchFields( searchTerm ) ),
        ...REQUEST_BODY_DEFAULTS
      }
}

function createRequestBodySearchFields ( searchTerm: string ) {
    return [
        {
          "fieldName": "content",
          "value": searchTerm
        },
        ...SEARCH_PARAM_DEFAULTS
      ]
}