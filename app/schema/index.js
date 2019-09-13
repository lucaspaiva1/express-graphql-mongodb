const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const { BookQueries, BookMutations } = require("./book");
const { AuthorQueries, AuthorMutations } = require("./author")

const QueryRootType = new GraphQLObjectType({
    name: "AppSchema",
    description: "Application Schema Query Root",
    fields: () => ({
        ...BookQueries,
        ...AuthorQueries
    })
});

const AppSchema = new GraphQLSchema({
    query: QueryRootType,
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: () => ({
            ...AuthorMutations,
            ...BookMutations
        })
    })
});

module.exports = AppSchema