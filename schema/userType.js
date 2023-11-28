const gql = require("graphql-tag");

const userType= gql`
    type Query {
        users: [User]
        user(id: ID!): User
        login(email: String!, password:String!):Token
    }
    type Mutation {
        createUser(fname:String, lname:String, email: String!, password:String!): Token
        updateUser(id: ID!,fname:String, lname:String, email: String!): Token
        deleteUser(id: ID!): User
        
    }
    type Token{
        user:User
        token:String
    }
    type User{
        id: ID
        fname: String
        lname: String
        role: Role
        email: String
        password: String
    }
    enum Role {
        ADMIN
        USER
    }
`;

module.exports = userType;