import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req, res, next) => {
  let token; // ✅ Declare token outside try-catch

  try {
    // ✅ Read from Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    const token = authHeader.split(" ")[1];

    // const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // req.body.userId = token_decode.id
    // next();

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;
    next();

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    console.log('VERIFY SECRET:', process.env.JWT_SECRET);
    console.log('TOKEN:', token);

  }
}

export default authUser


