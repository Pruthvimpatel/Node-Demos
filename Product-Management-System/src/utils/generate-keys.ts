import * as crypto from 'crypto';

// Generate a new IV
const iv: string = crypto.randomBytes(16).toString('hex');
console.log('IV:', iv);

// Generate a new Secret Key
const secret: string = crypto.randomBytes(32).toString('hex');
console.log('Secret Key:', secret);