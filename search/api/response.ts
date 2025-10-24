import * as z from '@zod/zod';

/**
 * Helper function to parse the body of a search xhr response.
 * Ensures the parsed body matches the ResponseSchema.
 * @param response response from the search xhr
 * @returns type-checked SearchResponse object.
 */
export async function parseResponse ( response: Response ) : Promise<SearchResponse> {

    const json = await response.json();

    return z.parse(ResponseSchema, json);

}

// represents the parsed body of a search xhr response
export type SearchResponse = z.infer<typeof ResponseSchema>;

// a row of a SearchResponse, corresponding to an ad.
export type SearchResponseRow = z.infer<typeof ResponseRowSchema>;

const ResponseRowSchema = z.object({
    actions: z.array(z.any()).length(0),
    values: z.array(z.string()).length(1)
})

const ResponseSchema = z.object({
    page: z.int(),
    pageSize: z.int(),
    pages: z.int(),
    rows: z.array(ResponseRowSchema)
}).refine( val => val.rows.length <= val.pageSize );