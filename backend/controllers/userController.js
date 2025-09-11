import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../modals/userModel.js'
import doctorModel from '../modals/doctorModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import appointmentModel from '../modals/appointmentModel.js'


// API to register user
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body

        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({
      success: true,
      message: "Login successful",
      token,
    });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//get user profile data

// const getProfile = async (req,res) => {
//     try {

//         const { userId } = req.body;
// const userData = await userModel.findById(userId).select("-password");

// res.json({ success: true, userData });


//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

const getProfile = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId).select("-password");

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// update  user profile API
// const updateProfile = async (req, res) => {
//     try {
//         const { userId, name, phone, address, dob, gender } = req.body;

//         const imageFile = req.file;


//         if (!name || !phone || !dob || !gender) {
//             return res.json({ success: false, message: "Data Missing" });
//         }

//         await userModel.findByIdAndUpdate(userId, {
//             name,
//             phone,
//             address: JSON.parse(address),
//             dob,
//             gender
//         });

//         if (imageFile) {
//             // upload image to cloudinary
//             const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//                 resource_type: "image"
//             });
//             const imageURL = imageUpload.secure_url;

//             await userModel.findByIdAndUpdate(userId, { image: imageURL });

//         }
//         res.json({ success: true, message: "Profile Updated" });


//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };


const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        const userId = req.userId; // ✅ Get it from auth middleware

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" });
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender
        });

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image"
            });
            const imageURL = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageURL });
        }

        res.json({ success: true, message: "Profile Updated" });
        console.log("Updating user ID:", userId);


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// book appointent API
// const bookAppointment = async (req, res) => {
//     try {

//         const { userId, docId, slotDate, slotTime } = req.body

//         const docData = await doctorModel.findById(docId).select('-password')


//         if (!docData.available) {
//             return res.json({ success: false, message: 'Doctor not available' })

//         }

//         let slots_booked = docData.slots_booked

//         // checking slots if they are available or not

//         if (slots_booked[slotDate]) {
//             if (slots_booked[slotDate].includes(slotTime)) {
//                 return res.json({ success: false, message: 'Slot not available' })
//             } else {
//                 slots_booked[slotDate].push(slotTime)
//             }
//         } else{
//             slots_booked[slotDate] = []
//             slots_booked.push(slotTime)
//         }

//         const userData = await userModel.findById(userId).select('-password')

//         delete docData.slots_booked

//         const appointentData = {
//             userId ,
//             docId ,
//             userData ,
//             docData ,
//             amount : docData.fees ,
//             slotTime,
//             slotDate,
//             date:Date.now()
//         }

//         const newAppointment = new appointmentModel(appointentData)
//         await newAppointment.save()

//         // save new slots data in docData
//         await doctorModel.findByIdAndUpdate(docId,{slots_booked})

//         res.json({success:true,message:error.message})

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select('-password');
    if (!docData.available) {
      return res.json({ success: false, message: 'Doctor not available' });
    }

    let slots_booked = docData.slots_booked || {};

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot not available' });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select('-password');
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};




export { registerUser, loginUser, getProfile, updateProfile , bookAppointment }