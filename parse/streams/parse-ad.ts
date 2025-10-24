import { DOMParser, Element, HTMLDocument, NodeType } from "@b-fuze/deno-dom";
import { cyan } from "@std/fmt/colors";
import { Interface1, Interface2 } from "./types.ts";

// Keys, whose corresponding value can be retrieved via `getTextNodeAfterStrongTitle`
const STRONG_TITLE_KEYS = [
  "Anbieter",
  "Bezeichnung des dualen Studiengangs",
  "Abschluss / Titel",
  "Hochschulart",
  "Format des Studiengangs",
  "Organisationsform des Anbieters",
  "Art des dualen Studiengangs",
  "Studieninhalte",
  "Ablauf",
  "Veranstaltungsort",
  "Studiengang existiert seit",
  "Beginn",
  "Studiendauer",
  "Studierende in diesem Studiengang",
//   "Absolventen in diesem Studiengang",
  "Weitere Anmerkungen zum dualen Studiengang",
  "Bewerbungsfrist",
  "Plätze zum nächsten Bewerbungstermin",
] as const;

// Keys, whose corresponding value can be retrieved via `getContentAterH3`
const H3_TITLE_KEYS = [
  "Internationalität",
  "Zugangsvoraussetzungen",
  "Akkreditierung",
  "Prüfung",
  "Informationen zur Hochschule",
] as const;

export const parseAd: TransformStream<Interface1, Interface2> = new TransformStream({
    
    transform ( chunk: Interface1, controller ) : void {

        console.error(`[DEBUG] Parsing html of url ${ JSON.stringify( chunk.url ) }`);

        const dom = new DOMParser().parseFromString( chunk.html, "text/html" );

        controller.enqueue({
            id: chunk.id,
            url: chunk.url,
            ...getKeyValueMapping( STRONG_TITLE_KEYS, getTextNodeAfterStrongTitle, dom ),
            ...getKeyValueMapping( H3_TITLE_KEYS, getContentAfterH3, dom ),
        });

    }
})

/**
 * Parses the value for the given keys from the dom using the getValueFn.
 * @param keyArray keys to get the values for
 * @param getValueFn function to parse the value for a given key from the DOM
 * @param dom the DOM instance
 * @returns A key-value mapping in form of an object
 */
function getKeyValueMapping<T extends readonly string[]>( keyArray: T, getValueFn: ( key: string, dom: HTMLDocument) => string, dom: HTMLDocument ) : Record<T[number], string | null> {
    return Object.fromEntries(
        keyArray.map( key => {
            let value = null;
            try {
                value = getValueFn( key, dom );
            } catch (e) {
                console.error( cyan("[INFO]") + " Failed to parse key", JSON.stringify( key ), "\n\t", e?.toString() );
            }
            return [ key, value ]
        } )
    ) as Record<T[number], string>
}

/**
 * Scrapes text around a `<strong>` tag containing a given title.
 * Fails if the `<strong>` tag isn't found or isn't unique.
 * @param title the text inside the `<strong>` tag
 * @param dom the HTMLDocument to scrape from
 * @returns the textContent of all text node siblings of the `<strong>` tag, concatendated, trimmed and with whitespaces collapsed
 * 
 * Example
 * ```html
 * <p>
 *  This gets scraped
 *  <strong>title</strong>
 *  This too gets scraped
 * </p>
 * ```
 */
function getTextNodeAfterStrongTitle ( title: string, dom: HTMLDocument ) : string {

    const strongTag = findUniqueTagWithTextContent( "strong", title, dom );

    const parentEl = strongTag.parentElement;
    if( !parentEl ) throw new Error( "Strong tag doesn't have a parent element" );

    const textNodes = [ ...parentEl.childNodes ].filter( el => el.nodeType === NodeType.TEXT_NODE );

    return textNodes
        .map( node => node.textContent.replace(/\s+/g, " ").trim() )
        .filter( text => text !== "" )
        .join(' ');

}

/**
 * Scrapes text in a `<p>` tag which is directly preceeded by an `<h3>` tag containing a given title.
 * Fails if the `<h3>` tag isn't found or ins't unique.
 * @param title the text inside the `<h3>` tag
 * @param dom the HTMLDocument to scrape from
 * @returns the innerText of the `<p>` tag, trimmed and with whitespaces collapsed
 */
function getContentAfterH3( title: string, dom: HTMLDocument ) : string {

    const h3Tag = findUniqueTagWithTextContent( "h3", title, dom );

    const pTag = h3Tag.nextElementSibling;
    if( !pTag ) throw new Error("Element doesn't exist!");
    if( pTag.tagName !== "P" ) throw new Error( `Element tag is incorrect. Should be 'P' but is ${ JSON.stringify( pTag.tagName ) }` );

    return pTag.innerText.replace(/\s+/g, " ").trim();

}


function findUniqueTagWithTextContent( tag: string, textContent: string, dom: HTMLDocument ) : Element {

    const tags = [ ...dom.querySelectorAll( tag ) ];

    const filter = ( el: Element ) => el.textContent.trim() === textContent;
    
    const filteredTags = tags.filter( filter );

    if( filteredTags.length !== 1 )
        throw new Error(`Failed to find unique ${ tag } tag with textContent ${ JSON.stringify( textContent ) }`);

    return filteredTags[0];

}