import app from "./app.js";
import cloudinary from "cloudinary";

app.listen(process.env.PORT, ()=>{
    console.log(`server is running ${process.env.PORT}`);
});