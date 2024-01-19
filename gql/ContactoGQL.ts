import { GraphQLError } from "graphql";
import { ContactoModelType, ContactoModel} from "../db/ContactoDB.ts";
import { validateTelefono } from "../apis/validateTelefono.ts";
import { getPais } from "../apis/getPais.ts";
import { getCapital } from "../apis/getCapital.ts";
import { getTime } from "../apis/getTime.ts";

export const ContactoGQL = {
    hora: async(parent:ContactoModelType):Promise<string> => {
        try{
            if(parent.pais){
                const capital = await getCapital(parent.pais);
                return await getTime(capital);
            }

            return "XX:XX:XX"; //si no se ha podido obtener la hora se pone esto
        }catch(error){
            throw new GraphQLError(error.message);
        }
    }
}