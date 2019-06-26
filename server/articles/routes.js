import express from 'express';
import Article from './article';

const router = express.Router();

router.get('/', (req, res) => {
  Article.find()
    .then(articles => {
      res.json(articles);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || 'Some error occurred while fetching articles.'
      });
    });
});

router.get('/:id', (req, res) => {
  Article.findById(req.params.id)
    .then(article => {
      if (!article) {
        return res.status(404).json({
          message: 'Article not found with id ' + req.params.id
        });
      }
      res.json(article);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: 'Artcile not found with id ' + req.params.id
        });
      }
      return res.status(500).json({
        message: 'Error retrieving article with id ' + req.params.id
      });
    });
});

router.post('/post', (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: 'Title Content can not be empty'
    });
  }

  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    place: req.body.place
  });

  article
    .save()
    .then(data => {
      res.json({ message: ' Article created succesfully', data });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || 'Failed to save the article in the database.'
      });
    });
});

router.put('/:id', (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      message: 'Note content can not be empty'
    });
  }

  Article.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      place: req.body.place
    },
    { new: true }
  )
    .then(article => {
      if (!article) {
        return res.status(404).json({
          message: 'Article not found with id ' + req.params.id
        });
      }
      res.json(article);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: 'Article not found with id ' + req.params.id
        });
      }
      return res.status(500).json({
        message: 'Error updating note with id ' + req.params.id
      });
    });
});

router.delete('/:id', (req, res) => {
  Article.findByIdAndRemove(req.params.id)
    .then(article => {
      if (!article) {
        return res.status(404).json({
          message: 'Article not found with id ' + req.params.id
        });
      }
      res.json({ message: 'Article deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Article not found with id ' + req.params.id
        });
      }
      return res.status(500).send({
        message: 'Could not delete article with id ' + req.params.id
      });
    });
});

export default router;
