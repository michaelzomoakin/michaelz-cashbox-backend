const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");

//Creating our own schema to take advantage of using middleware
//we create a schema variable and we pass the schema objects/structure/configuration to it
const userSchema = new mongoose.Schema(
  {
    //  Setting the type for our fields.
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    surname: {
      type: String,
      required: true,
      trim: true
    },
    dob: {
      type: Date,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      //adding default age value for when age is not provided
      default: 0,
      //    setting custom validator for age to be positive no
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number!");
        }
      }
    },

    height: {
      type: String,
      required: true,
      trim: true
    },
    hairColour: {
      type: String,
      required: true,
      trim: true
    },
    weight: {
      type: String,
      required: true,
      trim: true
    }
  },
  //Just adding this option to our schema will active the 2 timestamp fields (createdAt & UpdatedAt)
  {
    timestamps: true
  }
);

/*THIS MUST ALWAYS COME AS THE LAST BEFORE EXPORTING*/
//DEFINING OUR BASIC USER MODEL : - This takes 2 args, the model name and the schema (the model object/structure/configuration
const User = mongoose.model("User", userSchema);

module.exports = User;
