import { GraphQLError } from "graphql";
import { ContactoModelType, ContactoModel} from "../db/ContactoDB.ts";
import { validateTelefono } from "../apis/validateTelefono.ts";
import { getPais } from "../apis/getPais.ts";

export const Mutation = {
    addContact: async(_:unknown, args:{nombre: string, numero: string}):Promise<ContactoModelType> => {
        try{
            
            const validacion:boolean = await validateTelefono(args.numero);

            if(!validacion){
                throw new GraphQLError("El telefono no es valido");
            }

            const contacto = new ContactoModel({ //Anyado el pais a la BBDD para solo hacer una llamada a la API
                nombre: args.nombre,
                numero: args.numero,
                pais: await getPais(args.numero)
            })

            await contacto.save();

            return contacto;
        }catch(error){
            throw new GraphQLError(error.message);
        }
    },

    updateContact: async(_:unknown, args:{id: string, nombre: string, numero: string}):Promise<ContactoModelType> => {
        try{
            /*const contactoActualizado = await ContactoModel.findByIdAndUpdate(args.id, {
                nombre: args.nombre,
                numero: args.numero
            }, {runValidators: true, new: true}).exec();*/

            const contactoActualizado = await ContactoModel.findById(args.id).exec();

            if(!contactoActualizado){
                throw new GraphQLError("No se pudo encontrar el contacto con ese id");
            }

            if(args.nombre){
                contactoActualizado.nombre = args.nombre
            }

            if(args.numero){ //Si ha cambiado el numero, igual cambia el pais (hago esto en vez de encadenar pais pero asi llamo menos a la API)
                contactoActualizado.numero = args.numero;
                contactoActualizado.pais = await getPais(args.numero);
            }

            await contactoActualizado.save();

            return contactoActualizado;
        }catch(error){
            throw new GraphQLError(error.message);
        }
    }
};