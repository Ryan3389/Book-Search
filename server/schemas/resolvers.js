const { deleteBook } = require('../controllers/user-controller')
const User = require('../models/User')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        user: async (parent, { id, username }) => {
            const foundUser = await User.findOne({
                $or: [{ _id: id }, { username: username }]
            })

            if (!foundUser) {
                console.error('No user found with this id or username')
            }
            return foundUser
        }
    },

    Mutation: {
        createUser: async (parent, args) => {
            const newUser = await User.create(args)

            const token = signToken(newUser)

            return { token, newUser }
        },

        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] })

            if (!user) {
                console.log("Can't find user")
            }

            const correctPw = user.isCorrectPassword(password)

            if (!correctPw) {
                console.error('incorrect password')
            }

            const token = signToken(user)

            return { token, user }
        },
        savedBook: async (parent, { userId, book }) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { savedBooks: book } },
                    { new: true, runValidators: true }
                )
                return updatedUser
            } catch (error) {
                console.error(error)
            }
        },
        deleteBook: async (parent, { userId, bookId }) => {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            )

            if (!updatedUser) {
                console.error("Couldn't find user with this id")
            }

            return updatedUser
        }
    }
}

module.exports = resolvers