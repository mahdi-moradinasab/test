const userResolvers = require('./userResolver');
const productResolvers = require('./productResolver');

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...productResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...productResolvers.Mutation,
    },
};

module.exports = resolvers;
