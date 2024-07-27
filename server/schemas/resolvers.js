const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).populate('savedBooks');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookId, authors, description, title, image, link }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: { bookId, authors, description, title, image, link } } },
                    { new: true }
                ).populate('savedBooks');
                return updatedUser;
            }
            throw new AuthenticationError('Not logged in');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                ).populate('savedBooks');
                return updatedUser;
            }
            throw new AuthenticationError('Not logged in');
        },
    },
};

module.exports = resolvers;




// const User = require('../models/User')
// const { signToken } = require('../utils/auth')

// const resolvers = {
//     Query: {
//         user: async (parent, { id, username }) => {
//             try {
//                 const foundUser = await User.findOne({
//                     $or: [{ _id: id }, { username: username }]
//                 })

//                 if (!foundUser) {
//                     console.error('No user found with this id or username')
//                 }
//                 return foundUser
//             } catch (error) {
//                 console.error(error)
//                 throw new Error(error)
//             }

//         }
//     },

//     Mutation: {
//         createUser: async (parent, args) => {
//             try {
//                 const newUser = await User.create(args)
//                 const token = signToken(newUser)
//                 return { token, newUser }
//             } catch (error) {
//                 console.error(error)
//                 throw new Error(error)
//             }

//         },

//         login: async (parent, { username, email, password }) => {
//             try {
//                 const user = await User.findOne({ $or: [{ username }, { email }] })
//                 // const user = await User.findOne({ $or: [{ username: username }, { email: email }] })

//                 if (!user) {
//                     throw new Errow("Can't find user")
//                 }

//                 const correctPw = user.isCorrectPassword(password)

//                 if (!correctPw) {
//                     throw new Error('Incorrect password')
//                 }

//                 const token = signToken(user)

//                 return { token, user }

//             } catch (error) {
//                 console.error(error)
//             }

//         },
//         savedBook: async (parent, { userId, book }) => {
//             try {
//                 const updatedUser = await User.findOneAndUpdate(
//                     { _id: userId },
//                     { $addToSet: { savedBooks: book } },
//                     { new: true, runValidators: true }
//                 )

//                 if (!updatedUser) {
//                     throw new Error('User not found')
//                 }
//                 return updatedUser
//             } catch (error) {
//                 console.error(error)
//                 throw new Error(error)
//             }
//         },
//         deleteBook: async (parent, { userId, bookId }) => {
//             try {
//                 const updatedUser = await User.findOneAndUpdate(
//                     { _id: userId },
//                     { $pull: { savedBooks: { bookId: bookId } } },
//                     { new: true }
//                 )

//                 if (!updatedUser) {
//                     console.error("Couldn't find user with this id")
//                 }

//                 return updatedUser
//             } catch (error) {
//                 console.error(error)
//                 throw new Error(error)
//             }

//         }
//     }
// }

// module.exports = resolvers