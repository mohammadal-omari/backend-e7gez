const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    name: { type: String, default: 'name', required: true },
    clientId: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' },
    reserveNumber: { type: String, required: true, index: { unique: true } },
    reserveType: { type: mongoose.Schema.Types.ObjectId, required: true},

}, { collection: 'Reservation' });

module.exports = mongoose.model('Reservation', ReservationSchema)
