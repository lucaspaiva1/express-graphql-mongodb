const { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLList } = require("graphql");

const Book = require("../models/book");
const Author = require("../models/author");

const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    fields: () => {
        const { BookType } = require("./book");
        return {
            id: { type: new GraphQLNonNull(GraphQLString) },
            name: { type: new GraphQLNonNull(GraphQLString) },
            books: {
                type: new GraphQLList(BookType),
                resolve(parent, args) {
                    return Book.find({ authorID: parent.id });
                }
            }
        }
    }
});

const AuthorQueries = {
    authors: {
        type: new GraphQLList(AuthorType),
        resolve() {
            return Author.find({})
        }
    }
}

const AuhtorMutations = {
    createAuthor: {
        type: AuthorType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
            let author = new Author({ name: args.name });
            return author.save();
        }
    },
    updateAuthor: {
        type: AuthorType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            name: { type: GraphQLString }
        },
        resolve(parent, args) {
            return Author.findByIdAndUpdate(args.id, { name: args.name }, { new: true })
        }
    },
    deleteAuthor: {
        type: AuthorType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
            return Author.findByIdAndRemove(args.id)
        }
    }
}

module.exports = {
    AuthorType,
    AuthorQueries,
    AuhtorMutations
};