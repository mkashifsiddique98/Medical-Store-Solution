import mongoose from 'mongoose'

const compoundingMedicineSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const CompoundingMedicine = mongoose.model(
  'CompoundingMedicine',
  compoundingMedicineSchema
)

export default CompoundingMedicine
