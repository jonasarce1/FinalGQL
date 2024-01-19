import mongoose, { InferSchemaType } from "mongoose";
const Schema = mongoose.Schema;

const ContactoSchema = new Schema({
    nombre: {type: String, required: true},
    numero: {type: String, required: true, unique: true},
    pais: {type: String, required: false} //guardo pais en BBDD para usar menos llamadas a las apis
})

export type ContactoModelType = mongoose.Document & InferSchemaType<typeof ContactoSchema>;

export const ContactoModel = mongoose.model<ContactoModelType> ("Contacto", ContactoSchema);

