const controller = {};
const Serie = require("../models/serie");
const Platform = require("../models/platform");

controller.index = (req, res) => {
  res.send("Mi primer request con postman");
};

controller.saveSerie = async (req, res) => {
  let name = req.body.name;
  let type = req.body.type;

  if (name && type) {
    try {
      const serie = new Serie({ name: name, type: type });
      await serie.save();
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
};
controller.getSeries = async (req, res) => {
  const filter = req.query.filter;
  try {
    //const series = await Serie.find();
    //const series = await Serie.find({name:filter}); //filtro sencillo valor exacto
    //const series = await Serie.find({name:new RegExp(filter,'i')}); //filtro no valor exacto
    const query = {
      $or: [
        { name: new RegExp(filter, "i") },
        {
          type: new RegExp(filter, "i"),
        },
      ],
    };
    const series = await Serie.find(query);
    res.json(series);
  } catch (err) {
    res.status(500).send(err);
  }
};
controller.getSerie = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const serie = await Serie.findById(id);
      res.json(serie);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).sens();
  }
};
controller.updateSerie = async (req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  const platformId = req.body.platform;

  if (name && type && platformId) {
    try {
      const platform = await Platform.findById(platformId);
      await Serie.findByIdAndUpdate(req.params.id, {
        name: name,
        type: type,
        platform: platform,
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
controller.deleteSerie = async (req, res) => {
  let id = req.params.id;
  if (id) {
    try {
      await Serie.findByIdAndDelete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
};

module.exports = controller;
