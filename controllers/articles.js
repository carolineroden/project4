const Article = require('../models/article');


// articles
function indexRoute(req, res, next){
  Article
    .find()
    .exec()
    .then((article) => res.json(article))
    .catch(next);
}

function showRoute(req, res, next){
  Article
    .findById(req.params.id)
    .populate('translations.author')
    .then(article => res.json(article))
    .catch(next);
}

function createRoute(req, res, next){
  req.body.translation[0].author = req.currentUser;
  Article
    .create(req.body)
    .then(article => res.status(201).json(article))
    .catch(next);
}

function updateRoute(req, res, next){
  Article
    .findById(req.params.id)
    .then(article => {
      const translation = article.translations.find(translation => translation.language === req.params.language);
      Object.assign(translation, req.body);
      return article.save();
    })
    .then(article => res.json(article))
    .catch(next);
}

function deleteRoute(req, res, next){
  Article
    .findById(req.params.id)
    .then(article => {
      const translation = article.translations.find(translation => translation.language === req.params.language);
      translation.remove();
      return article.save();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}


// translations
function articleTranslateRoute(req, res, next){
  req.body.author = req.currentUser;
  Article
    .findById(req.params.id)
    .exec()
    .then(article => {
      article.translations.push(req.body);
      return article.save();
    })
    .then(article => res.json(article))
    .catch(next);
}



module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  articleTranslate: articleTranslateRoute
};
