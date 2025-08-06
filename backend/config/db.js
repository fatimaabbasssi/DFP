import mongoose  from "mongoose";

const dbConnection = () =>{
    return mongoose.connect(process.env.MONGO_URI)
    .then(() => 
        {
           console.log("DB connected successfully -----------💥💥");
        })
    .catch((err) => 
        {
         console.log("ERROR in DB CONNECTION : ", err);
        })

}

export default dbConnection