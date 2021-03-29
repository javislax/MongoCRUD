const controller = {};
const Platform = require("../models/platform");

controller.savePlatform = async (req, res) => {
  let name = req.body.name;

  if (name) {
    try {
      const platform = new Platform({ name: name });
      await platform.save();
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
};

controller.getPlatforms = async (req, res) => {
  const filter = req.query.filter;
  try {
    const query = {
      $or: [
        { name: new RegExp(filter, "i") },
      ],
    };
    const platforms = await Platform.find(query);
    res.json(platforms);
  } catch (err) {
    res.status(500).send(err);
  }
};
controller.getPlatform = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const platform = await Platform.findById(id);
      res.json(platform);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).sens();
  }
};
controller.updatePlatform = async (req, res) => {
  const name = req.body.name;
  if (name) {
    try {
      await Platform.findByIdAndUpdate(req.params.id, {
        name: name,
        updateAt: Date.now(),
      });
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
};
controller.deletePlatform = async (req, res) => {
  let id = req.params.id;
  if (id) {
    try {
      await Platform.findByIdAndDelete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
};

module.exports = controller;
