const mongoose = require('mongoose');
require('dotenv').config();



mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
console.log('connecting to MongoDB');
mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB');
})
.catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
})


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    number : {
        type: String,
        required: [true, 'User phone number required'],
        minlength: 8,
        validate: {
            validator: function(v) {
                return /\d{2,3}-\d+/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})

const Person = mongoose.model('Person', personSchema);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = Person;

