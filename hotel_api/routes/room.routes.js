const express = require("express");

// Controllers
const {
  createRoom,
  getAllRooms,
  getAvialableRooms,
} = require("../controllers/room.controllers");

const router = express.Router();

// Routes
router.post("/", createRoom);
router.get("/all", getAllRooms);
router.route("/avialable").get(getAvialableRooms);

module.exports = { roomRouter: router };
