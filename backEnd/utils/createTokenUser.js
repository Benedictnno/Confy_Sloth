const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    location: user.location,
  };
};

module.exports = createTokenUser;
