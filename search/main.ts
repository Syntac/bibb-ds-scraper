import { searchStudyAds } from "./search.ts";

type Args = {
  searchTerm: string
}

/**
 * Helper function to validate command line arguments.
 * In this case, validates that a searchTerm was provided
 * @returns validated arguments
 */
function getArgs () : Args {

  const searchTerm = Deno.args[0];
  
  if( typeof searchTerm !== "string" ) throw Error("Invalid command line argument. Usage: [searchTerm]")
  
  return { searchTerm };

}


const { searchTerm } = getArgs();

for await( const url of searchStudyAds( searchTerm ) ) {
  console.log( url );
}
