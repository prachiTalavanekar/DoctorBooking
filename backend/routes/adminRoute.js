// import express from 'express'
// import { addDoctor } from '../controllers/adminController.js'
// import upload from '../middlewares/multer.js'

// const adminRouter = express.Router()

// adminRouter.post('/add-doctor', upload.single('image'), addDoctor)

// export default adminRouter


import express from 'express';
import { addDoctor, allDoctors, allUsers, deleteUser, loginAdmin , getTotalUsers, getTotalDoctors } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';
import authUser from '../middlewares/authUser.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.get('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/all-users', authAdmin , allUsers);
adminRouter.delete('/delete-user/:id', authAdmin, deleteUser);

adminRouter.get('/stats/users', authUser, getTotalUsers);
adminRouter.get('/stats/doctors', authUser, getTotalDoctors);




export default adminRouter;
