const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const db_password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://fullstack:${db_password}@phonebook-app-db.cr6iz.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=phonebook-app-db`

mongoose.set('strictQuery', false);

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema);

const getAllPersons = () => {
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close();
    })
}


if (process.argv.length === 3) {
    getAllPersons();
    return;
}



const name = process.argv[3];
const number = process.argv[4];


const newPerson = new Person({
    name: name,
    number: number,
})
// console.log(newPerson);
newPerson.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
})
