const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const ReservationSchema = mongoose.Schema({
    name: { type: String, default: 'name', required: true },
    usertId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    reserveNumber: { type: String, required: true, index: { unique: true } },
    numberOfGuests: { type: Number, required: true },
    outSide: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: false, default: false },
    dateOfReservation: {type: Date, required: true, default: Date.now()},
    reserveType: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'item'},

}, { collection: 'Reservation' });


ReservationSchema.plugin(autoIncrement.plugin,  {
    model: 'reservation',
    field: 'reserveNumber',
    startAt: (new Date()).getUTCFullYear()+40*2,
    incrementBy: 1
  })
module.exports = mongoose.model('Reservation', ReservationSchema)
