import { GraphQLError } from "graphql";

export const validateTelefono = async(numero: string):Promise<boolean> => {
    const url = `https://api.api-ninjas.com/v1/validatephone?number=${numero}`;
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
        throw new GraphQLError("Error al obtener los datos del telefono de la API");
    }

    const json = await data.json();

    return json.is_valid;
}