const gql = require("graphql-tag");

const productType= gql`
    type Query {
        products: [Product]
        product(id: ID!): Product
    }
    type Mutation {
        createProduct(name:String!, price: Int!, description:String):Product
        updateProduct(id: ID!, name:String, price: Int, description:String): Product
        deleteProduct(id:ID!):Product
    }

    type Product{
        id: ID
        name:String
        price: Int
        description:String
        pic: String
    }
`;

module.exports = productType;