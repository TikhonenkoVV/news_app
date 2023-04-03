
// import { auth, firebaseApp } from '../auth';
// import { refs } from './refs';
// import { allData, add } from './main';
// import { onAuthStateChanged } from "firebase/auth";
// import { collection, doc, Timestamp, getFirestore, serverTimestamp, updateDoc, arrayUnion, where, Firestore, collectionGroup, getDoc} from "firebase/firestore"; 

// let db = ''
// let currentUser = {}

// export const sortReadNewsData = () => {
//     const savedLocalNews = localStorage.getItem('user-gallery');
//     const filterArray = JSON.parse(savedLocalNews).filter(({ readMore }) => readMore !== '');


  //   auth.onAuthStateChanged(user => {
  //     console.log(`Авторизований user === ${user.email}`)
  //     currentUser = user.email
  //     db = getFirestore(firebaseApp);
  //     fetchArrayWithDBReedNews()
  //   })

  // const fetchArrayWithDBReedNews = async () => {
  //   console.log('fetchArrayDBReed')
  //   const docRef = doc(db, currentUser, "reedNews");
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //       let galery = await docSnap.data().reedNews
  //       console.log(galery)
  //       // return galery
  //   } else {
  //       console.log("No such document reedNews!");
  //   }
  // }

//     const groupedByKey = filterArray.reduce((acc, obj) => { //====
//         const key = obj.key;
//         const collection = acc.get(key);
//         if (!collection) {
//           acc.set(key, [obj]);
//         } else {
//           collection.push(obj);
//         }
//         return acc;
//       }, new Map());
//        const result = Array.from(groupedByKey.values());
//       console.log('result', result[0])
//     return result;
// };