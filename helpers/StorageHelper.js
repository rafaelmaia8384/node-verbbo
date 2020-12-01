const AWS = require('aws-sdk');
const config = require('../config/config.js');

class StorageHelper {

    constructor() {
        this.storageEndpoint = new AWS.Endpoint(config.storage.endPoint);
        this.s3 = new AWS.S3({
            endpoint: this.storageEndpoint,
            region: 'sa-east-1',
            accessKeyId: config.storage.accessKey,
            secretAccessKey: config.storage.secretKey,
            signatureVersion: 'v4',
            //s3ForcePathStyle: true,
        });
    }

    getUploadUrl(name) {
        try {
            const path = config.storage.folderName + '/' + name;
            return this.s3.getSignedUrl('putObject', {
                Bucket: config.storage.bucketName,
                Key: path,
                ACL: 'public-read',
                Expires: 60 * 10, // expira em 10 minutos
            });
        }
        catch(error) {
            console.log('Error: ' + error);
            return null;
        }
    }

    deleteObject(name) {
        try {
            const path = config.storage.folderName + '/' + name;
            return this.s3.deleteObject({
                Bucket: config.storage.bucketName,
                Key: path,
            }, (error, data) => {
                if (error) {
                    console.log('Error: ' + error);
                }
            });
        }
        catch(error) {
            console.log('Error: ' + error);
            return null;
        }
    }
}

module.exports = new StorageHelper();
