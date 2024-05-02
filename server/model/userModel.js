import mongoose from 'mongoose'

const Schema = mongoose.Schema

// userSchema purpose: create new username, only username and password will be stored, username should be unique
const userSchema = new Schema({
  username: { type: String, required: true, unique: true  },
  password: { type: String, required: true }
})

export default mongoose.model('User', userSchema)
