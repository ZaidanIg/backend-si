const { 
    getAllArticlesHandler, 
    getArticleByIdHandler, 
    addArticleHandler, 
    updateArticleHandler, 
    deleteArticleHandler 
  } = require("../handler/articlesHandler.js");
  
  const { 
    addAspirationHandler, 
    getAllAspirationHandler, 
    deleteAspirationHandler 
  } = require("../handler/aspirationHandler.js");
  
  const { 
    loginAdminHandler, 
    addRegisterAdminHandler 
  } = require("../handler/authHandler.js");
  
  const routes = [
      // Auth Routes
      {
          method: 'POST',
          path: '/api/register',
          handler: addRegisterAdminHandler, 
          options: { auth: false }, 
      },
      {
          method: 'POST',
          path: '/api/login',
          handler: loginAdminHandler,
          options: { auth: false }, 
      },
      // Article Routes
      {
          method: 'POST',
          path: '/api/articles',
          handler: addArticleHandler,
          options: {
            auth: 'jwt'
          }
      },
      {
          method: 'PUT',
          path: '/api/articles/{id}',
          handler: updateArticleHandler,
          options: {
            auth: 'jwt'
          }
      },
      {
          method: 'GET',
          path: '/api/articles',
          handler: getAllArticlesHandler,
          options: {
            auth: false
          }
      },
      {
          method: 'GET',
          path: '/api/articles/{id}',
          handler: getArticleByIdHandler,
          options: {
            auth: 'jwt'
          }
      },
      {
          method: 'DELETE',
          path: '/api/articles/{id}',
          handler: deleteArticleHandler,
          options: {
            auth: 'jwt'
          }
      },
      // Aspiration Routes
      {
          method: 'POST',
          path: '/api/aspirations',
          handler: addAspirationHandler,
          options: {
            auth: false
          }
      },
      {
          method: 'GET',
          path: '/api/aspirations',
          handler: getAllAspirationHandler,
          options: {
            auth: false
          }
      },
      {
          method: 'DELETE',
          path: '/api/aspirations/{id}',
          handler: deleteAspirationHandler,
          options: {
            auth: 'jwt'
          }
      },
  ];
  
  module.exports = routes;
  