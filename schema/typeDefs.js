const { gql } = require("graphql-tag");
const userTypeDefs = require("./userType");
const productTypeDefs = require("./productType");

const typeDefs = gql`
    ${userTypeDefs}
    ${productTypeDefs}
`;

module.exports = typeDefs ;
