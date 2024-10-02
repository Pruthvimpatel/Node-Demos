import * as crypto from 'crypto';

import config from '../config/config';

class Encryption{
    private secret: Buffer;
    private iv:Buffer;

    constructor(encryptionKeys: { secret?: string; iv?: string } = {}) {
        this.secret = Buffer.from(encryptionKeys.secret || config.ENCRYPTION.SECRET, 'hex');
        this.iv = Buffer.from(encryptionKeys.iv || config.ENCRYPTION.IV, 'hex');
    }

    encryptWithAES(text:string):string {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.secret, this.iv);
        let encrypted = cipher.update(text, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }

    decryptWithAES(cipherText:string):string {
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.secret, this.iv);
        let decrypted = decipher.update(cipherText, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

const encryption = new Encryption();
export default encryption;