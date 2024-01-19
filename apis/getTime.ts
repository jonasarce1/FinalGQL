import { GraphQLError } from "graphql";

export const getTime = async(capital: string):Promise<string> => {
    const url = `https://api.api-ninjas.com/v1/worldtime?city=${capital}`;
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
        throw new GraphQLError("Error al obtener los datos del pais de la API");
    }

    const json = await data.json();

    return json.hour+":"+json.minute+":"+json.second;
}