const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const ReservationSchema = mongoose.Schema({
    name: { type: String, default: 'name', required: true },
    usertId: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' },
    reserveNumber: { type: String, required: true, index: { unique: true } },
    reserveType: { type: mongoose.Schema.Types.ObjectId, required: true},

}, { collection: 'Reservation' });


ReservationSchema.plugin(autoIncrement.plugin,  {
    model: 'reservation',
    field: 'reserveNumber',
    startAt: (new Date()).getUTCFullYear()+40*2,
    incrementBy: 1
  })
module.exports = mongoose.model('Reservation', ReservationSchema)
