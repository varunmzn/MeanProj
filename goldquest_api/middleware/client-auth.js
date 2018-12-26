module.exports = () => {

    // return a middleware
    return (req, res, next) => {
        const clientId = res.locals.auth['custom:client_id'];
        const groups = res.locals.auth['cognito:groups'];
        res.clientFilter = (groups.indexOf('goldquest-admin') > -1) ? {} : { client_id: clientId };
        next();
    }
}