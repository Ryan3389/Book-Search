const User = require('../models/User')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        user: async (parent, { id, username }) => {
            try {
                const foundUser = await User.findOne({
                    $or: [{ _id: id }, { username: username }]
                })

                if (!foundUser) {
                    console.error('No user found with this id or username')
                }
                return foundUser
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }

        }
    },

    Mutation: {
        createUser: async (parent, args) => {
            try {
                const newUser = await User.create(args)
                const token = signToken(newUser)
                return { token, newUser }
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }

        },

        login: async (parent, { username, email, password }) => {
            try {
                const user = await User.findOne({ $or: [{ username }, { email }] })
                // const user = await User.findOne({ $or: [{ username: username }, { email: email }] })

                if (!user) {
                    throw new Errow("Can't find user")
                }

                const correctPw = user.isCorrectPassword(password)

                if (!correctPw) {
                    throw new Error('Incorrect password')
                }

                const token = signToken(user)

                return { token, user }

            } catch (error) {
                console.error(error)
            }

        },
        savedBook: async (parent, { userId, book }) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { savedBooks: book } },
                    { new: true, runValidators: true }
                )

                if (!updatedUser) {
                    throw new Error('User not found')
                }
                return updatedUser
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }
        },
        deleteBook: async (parent, { userId, bookId }) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                )

                if (!updatedUser) {
                    console.error("Couldn't find user with this id")
                }

                return updatedUser
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }

        }
    }
}

module.exports = resolvers