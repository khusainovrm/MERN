const { Schema, model, Types } = requrie('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  linkd: [{ type: Types.ObjectId, ref: 'Link' }],
})

module.exports = model('User', schema)
