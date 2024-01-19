import { GraphQLError } from "graphql";
import { ContactoModelType, ContactoModel} from "../db/ContactoDB.ts";

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
    },

    getContacts: async(_:unknown):Promise<ContactoModelType[]> => {
        try{
            const contactos = await ContactoModel.find({}).exec();
            return contactos;
        }catch(error){
            throw new GraphQLError(error.message);
        }
    }
};