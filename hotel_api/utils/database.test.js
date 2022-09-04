const { db } = require("./database");

const { Room } = require("../models/room.models");

beforeAll(async () => {
  await db.sync({ force: true });
});

test("create room", async () => {
  expect.assertions(1);
  const room = await Room.create({
    price: 1250,
    details: "Suit",
  });
  expect(room.details).toEqual("Suit");
});

test("get room", async () => {
  expect.assertions(1);
  const room = await Room.findByPk(1);
  expect(room.details).toEqual("Suit");
});

test("delete room", async () => {
  expect.assertions(1);
  await Room.destroy({
    where: {
      id: 1,
    },
  });
  const room = await Room.findByPk(1);
  expect(room).toBeNull();
});

afterAll(async () => {
  await db.close();
});
