import { GraphQLError } from "graphql";
import { ContactoModelType, ContactoModel} from "../db/ContactoDB.ts";
import { validateTelefono } from "../apis/validateTelefono.ts";
import { getPais } from "../apis/getPais.ts";
//import { getCapital } from "../apis/getCapital.ts";

export const Mutation = {
    addContact: async(_:unknown, args:{nombre: string, numero: string}):Promise<ContactoModelType> => {
        try{
            //asegurar luego si hace falta checkear argumentos
            
            const validacion:boolean = await validateTelefono(args.numero);

            if(!validacion){
                throw new GraphQLError("El telefono no es valido");
            }

            //const capital = await getCapital(pais);

            const contacto = new ContactoModel({
                nombre: args.nombre,
                numero: args.numero,
                pais: await getPais(args.numero)
            })

            await contacto.save();

            return contacto;
        }catch(error){
            throw new GraphQLError(error.message);
        }
    }
};