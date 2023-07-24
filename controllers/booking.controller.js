const BookingModel = require("../models/booking.model");
const UserToken = require("../utils/UserToken");


const BookProperty = async (req, res) => {
    try {
        let userData = UserToken(req);
        console.log("userdata", userData)
        let Id = userData.userId;
        let name = userData.username;
        let { checkIn, checkOut, phone, price, place } = req.body
        let booking = new BookingModel({ user: Id, place, checkIn, checkOut, name, phone, price })
        booking.save()
        res.send({ "msg": "Booking Successful" });
    } catch (error) {
        res.send({ "error": error.message });
    }
}

const GetBookings = async (req, res) => {
    try {
        let bookings = await BookingModel.find().populate("user").populate("place")
        res.send({ "data": bookings })
    } catch (error) {
        res.send({ "error": error.message });
    }
}

const Booked_by_user = async (req, res) => {
    try {
        let userData = UserToken(req);
        let Id = userData.userId;
        console.log(Id)
        let user_bookings = await BookingModel.find({ user: Id }).populate("place");
        console.log(user_bookings)
        res.send({ "user": user_bookings })
    } catch (error) {
        res.send({ "error": error.message });
    }
}

module.exports = { BookProperty, GetBookings, Booked_by_user }