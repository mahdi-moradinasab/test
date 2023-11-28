const User = require("../models/user");
const auth = require('../middleware/auth')

const userResolvers = {
  Query: {
    users: async (parent, args, context, info) => await User.find({}),
    user: async (parent, args) => await User.findById(args.id),
    login: async (parent, args , context) => {
      // console.log(context)
      const user = await User.findOne({ email: args.email });
      if (!user) throw new Error(`user with this email${"email"} not found`);
      return {
        token: await user.generateAuthToken(user),
        user,
      };
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const { fname, lname, email, password } = args;
      const newUser = new User({
        fname,
        lname,
        email,
        password,
      });
      await newUser.save();
      console.log(newUser);
      return {
        token: await newUser.generateAuthToken(newUser),
        newUser,
      };
    },
    updateUser: async (parent, args) => {
      const { id } = args;
      const updateUser = await User.findByIdAndUpdate(id, args);
      if (!updateUser) throw new Error(`user with this ID ${id} not found`);
      console.log(updateUser);
      return {
        token: await updateUser.generateAuthToken(updateUser),
        updateUser,
      };
    },
    deleteUser: async (parent, args) => {
      const { id } = args;
      const deleteUser = await User.findByIdAndDelete(id);
      if (!deleteUser) throw new Error(`user with this ID ${id} not found`);
      return deleteUser;
    },
  },
};

module.exports = userResolvers;
