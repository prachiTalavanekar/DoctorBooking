// import validator from 'validator'
// import bcrypt from 'bcrypt'
// import {v2 as cloudinary} from 'cloudinary'
// import doctorModel from '../modals/doctorModel.js'


// // API for adding doctor
// const addDoctor = async (req,res) => {

// try {

// const { name,email,password,speciality,degree,experience,about,fees,address } = req.body
// const imageFile = req.file

// console.log({ name,email,password,speciality,degree,experience,about,fees,address },imageFile)
// //checking for all data to add doctor
// if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
//     return res.json({success:false,message:"missing details"})
// }

// // validating email format
// if (!validator.isEmail(email)) {
//     return res.json({ success: false, message: "Please enter a valid email" })
// }

// // validating strong password
// if (password.length < 8) {
//     return res.json({ success: false, message: "Please enter a strong password" })
// }

// // hashing doctor password
// const salt = await bcrypt.genSalt(10)
// const hashedPassword = await bcrypt.hash(password, salt)

// // upload image to cloudinary
// const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
// const imageUrl = imageUpload.secure_url

// const doctorData = {
//     name,
//     email,
//     image: imageUrl,
//     password: hashedPassword,
//     speciality,
//     degree,
//     experience,
//     about,
//     fees,
//     address: JSON.parse(address),
//     date: Date.now()
// }

// const newDoctor = new doctorModel(doctorData)
// await newDoctor.save()


// res.json({success:true,message:"doctor added"})



// }catch(error){
// console.log(error)
// res.json({success:false,message:error.message})
// }

// }

// export {addDoctor}


import validator from 'validator';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../modals/doctorModel.js';
import userModel from '../modals/userModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from '../modals/appointmentModel.js'

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        console.log({ name, email, password, speciality, degree, experience, about, fees, address }, imageFile);

        // Check required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: "Missing details" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Parse address if it's a string
        let parsedAddress = address;
        if (typeof address === 'string') {
            parsedAddress = JSON.parse(address);
        }

        // Create doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: parsedAddress,
            date: Date.now()
        };
        console.log(doctorData)
        // Save doctor
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        console.log(newDoctor)

        res.json({ success: true, message: "Doctor added" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


// API for Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // res.json({ success: true, message: "Login successful" });

            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.json({ success: true, token });

        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API for get all dooctors list for admin
const allDoctors = async (req,res) =>{
try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
} catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
}
}



// ✅ GET all users
const allUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).select('-password');
    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ DELETE user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deleted = await userModel.findByIdAndDelete(userId);

    if (!deleted) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



// ✅ Get total users count
const getTotalUsers = async (req, res) => {
  try {
    const count = await userModel.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get total doctors count
const getTotalDoctors = async (req, res) => {
  try {
    const count = await doctorModel.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


//count for total appointment API
const getAppointmentsCount = async (req, res) => {
  try {
    const count = await appointmentModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching appointments count:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { addDoctor, loginAdmin, allDoctors, allUsers, deleteUser , getTotalUsers, getTotalDoctors  ,getAppointmentsCount };


