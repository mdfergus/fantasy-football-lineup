const router = require("express").Router();
const fs = require("fs");
const axios = require("axios");

router.get("/players", async (req, res, next) => {
  const players = await JSON.parse(
    fs.readFileSync(__dirname + "/json.json", "utf8")
  );

  res.json(players);
});

router.get("/player/:name", async (req, res, next) => {
  const { name } = req.params;

  const players = await JSON.parse(
    fs.readFileSync(__dirname + "/json.json", "utf8")
  );

  res.redirect(
    `http://ibm-fantasy-widget.espn.com/espnpartner/dallas/players/players_${
      players[name]
    }_ESPNFantasyFootball_2018.json`
  );
});

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
