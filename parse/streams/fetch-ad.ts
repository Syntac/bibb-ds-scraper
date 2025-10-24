import { Interface1 } from "./types.ts";

export const fetchAd : TransformStream<string, Interface1> = new TransformStream({
    async transform ( url: string, controller ) : Promise<void> {

        console.error(`[DEBUG] Fetching url ${ JSON.stringify( url ) }`);

        const id = getId( url );

        const response = await fetch( url );

        const html = await response.text();

        controller.enqueue({ id, url, html });

    }
})



function getId ( url: string ) : number {

        const id_string = url.split('/').at(-1);
        if( !id_string ) throw new Error( `Url ${ JSON.stringify( url ) } doesn't contain id in last position` );

        return parseInt( url.split('/').at(-1)! )

}