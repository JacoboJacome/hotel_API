// Models
const { Booking } = require("../models/booking.models");
const { Room } = require("../models/room.models");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

exports.createBooking = catchAsync(async (req, res, next) => {
  const { days, pay, name, lastName, dni, email } = req.body;
  const { id } = req.params;

  const room = await Room.findByPk(id);

  if (!room) return next(new AppError("Room not found", 404));

  if (room.status != "available")
    return next(new AppError("Room not avialable", 400));

  const total_price = +days * +room.price;

  await room.update({ status: "pending" });

  const newBooking = await Booking.create({
    days,
    pay,
    total_price,
    name,
    lastName,
    dni,
    email,
    roomId: id,
  });

  res.status(201).json({ status: "success", data: { booking: newBooking } });
});

exports.payBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const booking = await Booking.findByPk(id);

  if (!booking) return next(new AppError("Booking not found", 404));

  if (booking.status != "Pending")
    return next(new AppError("Room not avialable", 400));

  await booking.update({ status: "purchased" });

  const room = await Room.findOne({ where: { id: booking.roomId } });

  if (!room) return next(new AppError("Room not found", 404));

  await room.update({ status: "rented" });

  res.status(200).json({ status: "success", data: { booking } });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const booking = await Booking.findByPk(id);

  if (!booking) return next(new AppError("Booking not found", 404));

  await booking.update({ status: "deleted" });

  const room = await Room.findOne({ where: { id: booking.roomId } });

  if (!room) return next(new AppError("Room not found", 404));

  await room.update({ status: "available" });

  res.status(200).json({ status: "success", data: { booking } });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.findAll();

  res.status(200).json({ status: "succes", data: { bookings } });
});
