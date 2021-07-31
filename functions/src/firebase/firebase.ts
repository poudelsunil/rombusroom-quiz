import * as admin from 'firebase-admin';
// import global from "../utils/Global";

// admin.initializeApp({
//   credential: admin.credential.cert(global.config.firebaseServiceAccountKey)
// });

import * as serviceAccount from "./serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://bitplatform-develop.firebaseio.com"
});

const db = admin.firestore();

console.log("Initilized firebase : with "+serviceAccount.project_id);

export default db;
export{db, admin};