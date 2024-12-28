const jwt = require('jsonwebtoken');

const productAuth = async (req, res, next) => {
    try {
        // Retrieve the authorization header
        const auth = req.headers['authorization'];
        // console.log('Authorization Header:', auth);

        // Check if the token is provided
        if (!auth) {
            return res.status(403).send({ message: 'Unauthorized, JWT token is required' });
        }

        // Verify the JWT token
        const decode = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decode; // Attach decoded data to `req.user`
        next(); // Pass control to the next middleware
    } catch (error) {
        // Handle invalid or expired token
        console.error('JWT Error:', error.message);
        return res.status(403).send({ message: 'Unauthorized, JWT token is wrong or expired', error: error.message });
    }
};

module.exports = productAuth;
