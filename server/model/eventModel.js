import mongoose from 'mongoose'

const Schema = mongoose.Schema

// attendeeSchema purpose: create/handle RSVP responses, individual attendee responses will be stored in Array, see 'eventSchema' below
const attendeeSchema = new Schema({
  name: { type: String, required: true },
  response: { type: String }
})

// eventSchema purpose: create new events, only eventName and startTime are required fields
const eventSchema = new Schema({
  username: { type: String, required: true },
  eventName: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  location: { type: String },
  description: { type: String },
  attendees: [attendeeSchema]
})

export default mongoose.model('Event', eventSchema)
