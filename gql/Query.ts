import { GraphQLError } from "graphql";
import { ContactoModelType, ContactoModel} from "../db/ContactoDB.ts";
import { validateTelefono } from "../apis/validateTelefono.ts";
import { getPais } from "../apis/getPais.ts";
//import { getCapital } from "../apis/getCapital.ts";

export const Query = {
    getContact: async(_:unknown, args:{id: string}):Promise<ContactoModelType> => {
        try{
            const contacto = await ContactoModel.findById(args.id).exec();

            if(!contacto){
                throw new GraphQLError("No se ha encontrado un contacto con ese id");
            }

            return contacto;
        }catch(error){
            throw new GraphQLError(error.message);
        }
    }
};