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
        {
          type: new RegExp(filter, "i"),
        },
      ],
    };
    const platforms = await Platform.find(query);
    res.json(platforms);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = controller;
