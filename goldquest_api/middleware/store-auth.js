module.exports = () => {
    // return a middleware
    return (req, res, next) => {
        const storeId = res.locals.auth['custom:store_id'];
        const storeAccess = (res.locals.auth['custom:store_access']) ? res.locals.auth['custom:store_access'].split(',') : [];
        storeAccess.push(storeId);
        res.storeFilter = {
            store_id: storeAccess
        };
        next();
    }
}