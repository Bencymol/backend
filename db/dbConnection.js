import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/DoctorBookingDB")
  .then(() => {
    console.log("DB connected");
  })
  .catch(e => {
    console.log(e.message);
  });

export default mongoose;
