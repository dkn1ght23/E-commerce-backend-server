let initWelcomeApi = (app) => {
    app.get('/' ,(req, res) => {
        res.json({
            message: 'Welcome to the node server',
            start: 200
        })
    })
}
module.exports = initWelcomeApi;