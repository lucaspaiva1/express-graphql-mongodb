const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = require("graphql");

const Book = require("../models/book");

const BookType = new GraphQLObjectType({
    name: "BookType",
    fields: () => {
        const Author = require("../models/author");
        const { AuthorType } = require("./author");
        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            pages: { type: GraphQLInt },
            authorID: { type: GraphQLID },
            author: {
                type: AuthorType,
                resolve: function (book) {
                    return Author.findById(book.authorID);
                }
            }
        }
    }
});

const BookQueries = {
    books: {
        type: new GraphQLList(BookType),
        resolve() {
            return Book.find({});
        }
    }
};

const BookMutations = {
    createBook: {
        type: BookType,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            authorID: {
                type: new GraphQLNonNull(GraphQLID)
            },
            pages: {
                type: new GraphQLNonNull(GraphQLInt)
            }
        },
        resolve(root, args) {
            let book = new Book({
                name: args.name,
                pages: args.pages,
                authorID: args.authorID,
            });
            return book.save();
        }
    },
    updateBook: {
        type: BookType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            authorID: { type: GraphQLID },
            name: { type: GraphQLString },
            pages: { type: GraphQLInt }
        },
        resolve(root, args) {
            return Book.findByIdAndUpdate(
                args.id,
                {
                    name: args.name,
                    pages: args.pages,
                    authorID: args.authorID,
                },
                { new: true }
            );
        }
    },
    deleteBook: {
        type: BookType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(root, args) {
            return Book.findByIdAndRemove(args.id);
        }
    }
};

module.exports = {
    BookType,
    BookQueries,
    BookMutations
};