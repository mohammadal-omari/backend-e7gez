const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const ReservationSchema = mongoose.Schema({
    // name: { type: String, default: 'name', required: true },
    reserveNumber: { type: String, required: true, index: { unique: true } },
    numberOfGuests: { type: Number, required: true },
    outSide: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: false, default: false },
    tableNumber:{ type: Number, required: false },
    reserveStatus:{ type: String, required: true, default: "NEW" },
    dateCreated: {type: Date, default: Date.now()},
    dateOfReservation: {type: Date, required: true, default: Date.now()},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    vendorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'vendor'},
}, { collection: 'reservation' });

// reserveNumber
//    vendorId
//  userId
//     visitorNumber or numberOfGuests
//     tableNumber:1,
//     reserveStatus:"NEW",
//     creatDate:DateTime.now(),
//     dateOfReservation:DateTime.now()
ReservationSchema.plugin(autoIncrement.plugin,  {
    model: 'reservation',
    field: 'reserveNumber',
    startAt: (new Date()).getUTCFullYear()+40*2,
    incrementBy: 1
  })
module.exports = mongoose.model('reservation', ReservationSchema)
