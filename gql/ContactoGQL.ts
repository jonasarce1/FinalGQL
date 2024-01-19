import { GraphQLError } from "graphql";
import { ContactoModelType} from "../db/ContactoDB.ts";
import { getCapital } from "../apis/getCapital.ts";
import { getTime } from "../apis/getTime.ts";

export const ContactoGQL = {
    hora: async(parent:ContactoModelType):Promise<string> => {
        try{
            if(parent.pais){
                const capital = await getCapital(parent.pais);
                return await getTime(capital);
            }

            throw new GraphQLError("No se ha podido obtener la hora") //si no se ha podido obtener la hora se pone esto
        }catch(error){
            throw new GraphQLError(error.message);
        }
    }
}