const createBlog = require('./create-blog');

let initBlogModule = (app) =>{
    createBlog(app);
}

module.exports = (app) =>{
    initBlogModule(app);
}