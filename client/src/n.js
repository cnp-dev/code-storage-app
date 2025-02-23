import crypto from 'crypto';

// Generate a random 64-byte hex string
const secretKey = crypto.randomBytes(64).toString('hex');

console.log('Generated JWT Secret Key:', secretKey);
