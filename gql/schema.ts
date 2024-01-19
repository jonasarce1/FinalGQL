export const typeDefs = `#graphql
    type ContactoGQL {
        nombre: String!,
        numero: String!,
        pais: String,
        hora: String
    }

    type Query {
        getContact(id: ID!):ContactoGQL!
        getContacts:[ContactoGQL!]!
    },

    type Mutation { 
        addContact(nombre: String!, numero: String!):ContactoGQL!
        updateContact(id: ID!, nombre: String, numero: String):ContactoGQL!
        deleteContact(id: ID!):Boolean!
    }

`;