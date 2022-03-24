const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/Platform_Integration_Sf_tech",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MongoDB connected..");
  }
);

const userSchema = new mongoose.Schema({
  
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todoList: [
    {
      type:String
    },
  ],
});

const userModel = new mongoose.model("UserData", userSchema);

module.exports = userModel;
