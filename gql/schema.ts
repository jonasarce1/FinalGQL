export const typeDefs = `#graphql
    type ContactoGQL {
        nombre: String!,
        numero: String!,
        pais: String,
        hora: String
    }

    type Query {
        getContact(id: ID!):ContactoGQL!
    },

    type Mutation { 
        addContact(nombre: String!, numero: String!):ContactoGQL!
    }

`;