const mongoose = require('mongoose')


if (process.argv.length < 3) {
    console.log('You shall give a password to access the database!')
    process.exit(1)
}
else if (process.argv.length == 4 && process.argv.length < 5) {
    console.log('You must give a name and number to add a new person to the database!')
    process.exit(1)
}

//Create a new schema
    const PersonSchema = new mongoose.Schema({
        name: String,
        number: String
    })
//Create a new model
const Person = mongoose.model('Person', PersonSchema)


const showAgenda = () => {
    Person.find({})
        .then(result => {
            console.log('Showing contacts:')
            result.forEach(person => {
                console.log(`${person.name}\t${person.number}`)
            })
            mongoose.connection.close()
        })
}

const addNewPerson = () => {
    //Get values from command prompt
    const name = process.argv[3]
    const number = process.argv[4]

    //Create a new Person object
    const person = new Person({
        name : name,
        number: number
    })

    //Save the Person Object in the database
    person.save()
        .then(resulta => {
            console.log(`Added ${person.name} to the database!`)
            mongoose.connection.close()
        })
}


const password = process.argv[2]

const url = 
    `mongodb+srv://tnbustos2007_db_user:${password}@cluster0.fgflx8y.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)




if (process.argv.length < 4)
    showAgenda()
else 
    addNewPerson()