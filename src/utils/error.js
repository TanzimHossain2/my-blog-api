const notFound = (message = 'Resource Not Found') => {
    const err = new Error(message);
    err.status = 404;
    return err;
};

module.exports = {
    notFound,
};
