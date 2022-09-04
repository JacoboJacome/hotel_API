// Models
const { Room } = require("../models/room.models");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

exports.createRoom = catchAsync(async (req, res, next) => {
  const { price, details } = req.body;

  const newRoom = await Room.create({
    price,
    details,
  });

  res.status(201).json({ status: "success", data: { room: newRoom } });
});

exports.getAllRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.findAll();

  res.status(200).json({ status: "success", data: { rooms } });
});

exports.getAvialableRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.findAll({ where: { status: "available" } });

  if (!rooms)
    return next(new AppError("Rooms not exist, please create rooms.", 404));

  res.status(200).json({ status: "success", data: { rooms } });
});
