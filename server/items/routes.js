import express from "express";
import Item from "./Items";

const router = express.Router();

//here we want to fetch all the items from the database
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

//here we want to post an item to our database
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item));
});

//here we want to delete an item from the database
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(400).json({ success: false }));
});

export default router;
