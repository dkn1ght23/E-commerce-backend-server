let initCors = (app) => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Authentication');
        next();
    })
}
module.exports = initCors;