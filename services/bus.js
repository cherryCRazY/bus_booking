// Db
const mongoose = require("mongoose");
const Fawn = require("fawn");
Fawn.init(mongoose);

// DB models
const { BusRoute } = require("../models/BusRoute");
const { BusBoard } = require("./../models/BusBoard");
const { Seat } = require("../models/Seat");
const { BusTransport } = require("../models/BusTransport");

// Itils
const moment = require("moment");

module.exports = {
    findRoute: async ({ body }) => {
        const { fromCity, toCity, dateStart } = body;

        let startDate;
        let endDate;
        if (moment(new Date(dateStart)).isSame(moment(), "day")) {
            startDate = new Date(dateStart);

            let result = new Date(new Date(dateStart).setHours(0, 0, 0, 0));
            endDate = new Date(result.setDate(result.getDate() + 1));
        } else {
            startDate = new Date(new Date(dateStart).setHours(0));

            let result = new Date(new Date(dateStart).setHours(0, 0, 0, 0));
            endDate = new Date(result.setDate(result.getDate() + 1));
        }

        return await BusRoute.find({
            fromCity,
            toCity,
            dateStart: { $gte: startDate, $lt: endDate }
        })
            .populate("bus")
            .sort("dateStart");
    },
    bookingSeat: async ({ body }) => {
        const { tickets } = body;

        const seats = [];

        for (let i = 0; i < tickets.length; i++) {
            const id = tickets[i]._id;

            const busBoard = await BusBoard.findOne({
                "places._id": id
            }).select("places");
            busBoard.places.id(id).seatTaken = true;

            seats.push(busBoard.save());
        }
        return await Promise.all(seats);
    },
    setNewRoute: async ({ body }) => {
        const { fromCity, toCity, dateStart, dateFinish, price, bus } = body;

        const findedBus = await BusTransport.findById(bus.id);

        if (!findedBus) return null;

        const busBoard = new BusBoard({
            transport: bus.id
        });

        for (let i = 1; i <= findedBus.countSeats; i++) {
            busBoard.places.push(
                new Seat({
                    price,
                    numberOfSeat: i
                })
            );
        }
        const busRoute = new BusRoute({
            toCity,
            fromCity,
            dateStart,
            dateFinish,
            price,
            bus: {
                _id: busBoard.id
            }
        });

        new Fawn.Task()
            .save("busroutes", busRoute)
            .save("busboards", busBoard)
            .run();

        return busRoute;
    }
};
