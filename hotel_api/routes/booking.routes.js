const express = require("express");

// Controllers
const {
  deleteBooking,
  payBooking,
  getAllBookings,
  createBooking,
} = require("../controllers/booking.controller");

const router = express.Router();

router.get("/", getAllBookings);
router.post("/pay_booking/:id", payBooking);
router.post("/delete_booking/:id", deleteBooking);
router.post("/room/:id", createBooking);

module.exports = { bookingRouter: router };
