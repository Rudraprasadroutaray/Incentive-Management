const mongoose = require('mongoose')

let dataSchema = new mongoose.Schema({

  salesTarget: Number,
  empId: Number,
  percentage: String,
  bonus: String,
  date: Date,
  holidayPackage: String,
  destination: String,
  duration: String,
  cost: String,
  totalSales: Number

})

let registerSchema = mongoose.model('insentiveDetails', dataSchema)

module.exports = registerSchema