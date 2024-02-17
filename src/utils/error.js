const notFound = (message = 'Resource Not Found') => {
    const err = new Error(message);
    err.status = 404;
    return err;
};

const badRequest = (message = 'Bad Request') => {
    const err = new Error(message);
    err.status = 400;
    return err;
};

const serverError = (message = 'Internal Server Error') => {
    const err = new Error(message);
    err.status = 500;
    return err;
};

module.exports = {
    notFound,
    badRequest,
    serverError
};
