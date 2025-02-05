import mongoose from 'mongoose'

const storeCoinSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    value: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
)

const StoreCoin = mongoose.model('StoreCoin', storeCoinSchema)

export default StoreCoin
