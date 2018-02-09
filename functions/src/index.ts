import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);


//cloud vision
import * as vision from '@google-cloud/vision';
const visionClient = new vision.ImageAnnotatorClient();

//Dedicated bucke or cloud functions invocation
const bucketName = 'photo-voice-83720';

