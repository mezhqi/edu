import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/edu2', {useNewUrlParser: true});

const advertSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    create_time: { type: Date, default: Date.now },
    last_modified_time: { type: Date, default: Date.now },
})

export default mongoose.model("advert", advertSchema)