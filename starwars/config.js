module.exports = {
    isTesting: () => {
        return typeof jest !== "undefined";
    },
    MONGO_URL: process.env.MONGO_URL
};
