import validator from 'validator'
import bcrypt from 'bcryptjs'
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



//----------------------working -----------------------
// const bookAppointment = async (req, res) => {
//     try {
//         const { userId, docId, slotDate, slotTime } = req.body;

//         const docData = await doctorModel.findById(docId).select('-password');
//         if (!docData.available) {
//             return res.json({ success: false, message: 'Doctor not available' });
//         }

//         let slots_booked = docData.slots_booked || {};

//         if (slots_booked[slotDate]) {
//             if (slots_booked[slotDate].includes(slotTime)) {
//                 return res.json({ success: false, message: 'Slot not available' });
//             } else {
//                 slots_booked[slotDate].push(slotTime);
//             }
//         } else {
//             slots_booked[slotDate] = [slotTime];
//         }

//         const userData = await userModel.findById(userId).select('-password');
//         delete docData.slots_booked;

//         const appointmentData = {
//             userId,
//             docId,
//             userData,
//             docData,
//             amount: docData.fees,
//             slotTime,
//             slotDate,
//             date: Date.now(),
//         };

//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();

//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//         res.json({ success: true, message: "Appointment booked successfully" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// controllers/userController.js
const bookAppointment = async (req, res) => {
    try {
        // take the authenticated user id
        const userId = req.userId;          // ✅ from authUser
        const { docId, slotDate, slotTime } = req.body;

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
            userId,                  // ✅ use authenticated userId
            docId,
            userdata: userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: 'Appointment booked successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// API for getting booked appointments
// const listAppointment = async (req, res) => {
//     try {
//         const { userId } = req.body

//         // You may want to perform some operations here using userId
//         const appointments = await appointmentModel.find({ userId })

//         res.json({ success: true, appointments })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }



// controllers/userController.js
// const listAppointment = async (req, res) => {
//   try {
//     // get the user id set by authUser middleware
//     const userId = req.userId;

//     if (!userId) {
//       return res.status(400).json({ success: false, message: 'User ID not found' });
//     }

//     // fetch only this user’s appointments
//     const appointments = await appointmentModel.find({ userId });

//     return res.json({ success: true, appointments });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



// list appointment API
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const appointments = await appointmentModel.find({ userId });
        res.json({ success: true, appointments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// cancel appointment
// const cancelAppointment = async (req, res) => {
//     try {
//         const { userId, appointmentId } = req.body
//         const appointmentData = await appointmentModel.findById(appointmentId)

//         // verify appointment user
//         if (appointmentData.userId !== userId) {
//             return res.json({ success: false, message: 'Unauthorized action' })
//         }
//         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

//         // delete doctor slot

//         const { docId, slotDate, slotTime } = appointmentData;

//         const doctorData = await doctorModel.findById(docId);

//         let slots_booked = doctorData.slots_booked;

//         slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//         res.json({ success: true, message: 'Appointment Cancelled' });


//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;   // same as listAppointment
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: 'Appointment not found' });
    }

    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: 'Unauthorized action' });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // delete doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: 'Appointment Cancelled' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for payment razorpay
// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });


// const paymentRazorpay = async (req, res) => {

//     try {
//          const { appointmentId } = req.body;
//   const appointmentData = await appointmentModel.findById(appointmentId);

//   if (!appointmentData || appointmentData.cancelled) {
//     return res.json({
//       success: false,
//       message: 'Appointment Cancelled or not found'
//     });
//   }
//   // creating options for razorpay payment
// const options = {
//   amount: appointmentData.amount * 100,
//   currency: process.env.CURRENCY,
//   receipt: appointmentId,
// };

// // creation of an order
// const order = await razorpayInstance.orders.create(options);

// res.json({ success: true, order });

//     } catch (error) {
//          console.log(error);
//     res.json({ success: false, message: error.message });
//     }
 
// };



export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment }