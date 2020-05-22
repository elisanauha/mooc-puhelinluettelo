const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);

// const Person = mongoose.model("Person", personSchema);

// if (process.argv.length > 3) {
//   const person = new Person({
//     name: process.argv[3],
//     number: process.argv[4],
//   });

//   person.save().then((response) => {
//     console.log(
//       `Added ${response.name} number ${response.number} to phonebook`
//     );
//     mongoose.connection.close();
//   });
// } else {
//   Person.find({}).then((result) => {
//     console.log("Phonebook:");
//     result.forEach((person) => {
//       console.log(person.name + " " + person.number);
//     });
//     mongoose.connection.close();
//   });
// }
