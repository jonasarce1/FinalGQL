import { GraphQLError } from "graphql";

export const getCapital = async(pais: string):Promise<string> => {
    const url = `https://api.api-ninjas.com/v1/country?name=${pais}`;

    const API_KEY = Deno.env.get("API_KEY");

    if(!API_KEY){
        throw new GraphQLError("Error al obtener la API KEY");
    }

    const data = await fetch(url,
        {
            headers:{
                "X-Api-Key": API_KEY
            }
        }
        )

    if(data.status !== 200){
        throw new GraphQLError("Error al obtener los datos de la capital de la API");
    }

    const json = await data.json();

    return json[0].capital;
}