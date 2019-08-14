module.exports = {
  getMiddlewares: () => {
    return [require("./authorization")];
  },
};
