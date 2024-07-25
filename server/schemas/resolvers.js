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
    }
}

module.exports = resolvers