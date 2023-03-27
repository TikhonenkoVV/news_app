import { auth, firebaseApp } from './auth';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { refs } from './refs';
import { allData, add } from './main';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCustomToken, onAuthStateChanged } from "firebase/auth";
import { collection, doc, setDoc, query, getDocs, onSnapshot, addDoc, orderBy, limit, Timestamp, getFirestore, serverTimestamp, updateDoc, arrayUnion, where, Firestore, collectionGroup, getDoc} from "firebase/firestore"; 

export const registerFunc = () => {
    if (refs.email_value.value == '') {
        alert('Введіть email')
        return
    }
    if (refs.password_value.value == '') {
        alert('Введіть пароль')
        return
    }
    if (refs.password_value_confirm.value == '') {
        alert('Введіть пароль для підтвердження')
        return
    }
    if (refs.password_value.value !==  password_value_confirm.value) {
        alert('Паролі не співпадають')
        return
    }
    createUserWithEmailAndPassword(auth, refs.email_value.value, refs.password_value_confirm.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(`Пользователь ${user.email} успешно зарегистрирован`)
      let autorized = JSON.stringify(true)
      localStorage.setItem('autorized', autorized)
      let bite_user_autorize = JSON.stringify(true)
      localStorage.setItem('bite-user-autorize', bite_user_autorize)
      //localStorage.setItem('token', user.accessToken)
      clearValueFunction()
      refs.authorizationModal.classList.add('is-hidden');
      enableBodyScroll(document.body);
      allData()
      fetchArrayWithPopularNews()
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      if (errorCode == 'auth/email-already-in-use') {
        alert('Такий Email вже використовується, спробуйте інший...')
      }
      clearValueFunction()
    });
}

function clearValueFunction() {
    refs.email_value.value = ''
    refs.password_value.value = ''
    refs.password_value_confirm.value = ''
}


let db = ''
let currentUser = {}


export const checkAuth = () => {
  auth.onAuthStateChanged(user => {
    console.log(user)
    currentUser = user.email
    db = getFirestore(firebaseApp);
    fetchArrayWithPopularNews()
    fetchArrayWithDBFavoriteNews()
    fetchArrayWithDBReedNews()
  })
}

export const loginFunc = () => {
    if (refs.email_value.value == '') {
        alert('Введіть email')
        return
    }
    if (refs.password_value.value == '') {
        alert('Введіть пароль')
        return
    }
    if (refs.password_value_confirm.value == '') {
        alert('Введіть пароль для підтвердження')
        return
    }
    if (refs.password_value.value !==  password_value_confirm.value) {
        alert('Паролі не співпадають')
        return
    }
    signInWithEmailAndPassword(auth, refs.email_value.value, refs.password_value_confirm.value)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    currentUser = user.email
    console.log(`Пользователь ${user.email} успешно авторизирован`)
    uid = user.uid
    db = getFirestore(firebaseApp);
    usersRef = collection(db, "users");
    let autorized = JSON.stringify(true)
    localStorage.setItem('autorized', autorized)
    let bite_user_autorize = JSON.stringify(true)
    localStorage.setItem('bite-user-autorize', bite_user_autorize)
    clearValueFunction()
    refs.authorizationModal.classList.add('is-hidden');
    enableBodyScroll(document.body);
    allData()
    //fetchArray()
    fetchArrayWithPopularNews()
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    console.log(errorCode)
    if (errorCode == 'auth/user-not-found') {
      alert('Email не знайдено. Потрібна реєстрація')
    }
    clearValueFunction()
  });
}

export const fetchArrayWithPopularNews = async () => {
    console.log('fetchArrayDB')
    const docRef = doc(db, currentUser, "popularNews");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("popularNews:", docSnap.data().allNews);
    } else {
        console.log("No such document!");
    }
}

export const fetchArrayWithDBFavoriteNews = async () => {
  console.log('fetchArrayDB')
  const docRef = doc(db, currentUser, "favoriteNews");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
      console.log("favoriteNews:", docSnap.data().favoriteNews);
  } else {
      console.log("No such document!");
  }
}

export const fetchArrayWithDBReedNews = async () => {
  console.log('fetchArrayDB')
  const docRef = doc(db, currentUser, "reedNews");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
      console.log("reedNews:", docSnap.data().reedNews);
  } else {
      console.log("No such document!");
  }
}




export const updateFavoriteFunc = async (array) => {
  const docData = {
    favoriteNews: array, // === сюди підставляємо масив кожного разу при апдейті...
  };
  await setDoc(doc(db, currentUser, 'favoriteNews'), docData);
  console.log('updateFavoriteFunc === "OK"')
};

export const updateReedFunc = async (array) => {
  const docData = {
    reedNews: array, // === сюди підставляємо масив кожного разу при апдейті...
  };
  await setDoc(doc(db, currentUser, 'reedNews'), docData);
  console.log('updateReedFunc === "OK"')
};

export const updatePopularNewsFunc = async (array) => {
  const docData = {
    allNews: array, // === сюди підставляємо масив кожного разу при апдейті...
  };
  await setDoc(doc(db, currentUser, 'popularNews'), docData);
  console.log('updatePopularNewsFunc === "OK"')
};


// updateReed.addEventListener('click', () => {
//   updateReedFunc()
// })


  // Atomically add a new region to the "regions" array field.
  // await updateDoc(washingtonRef, {
  //     regions: arrayUnion(arr)
  // });
  // console.log(currentUser)
  // await addDoc(collection(db, currentUser), {
  //   message: 'ваавиавививтавтаcurrentUserв',
  //   age: '25',
  // });



  // const fetchArray = () => {
  //   fetch('https://jsonplaceholder.typicode.com/albums')
  //   .then(response => response.json())
  //   .then(json => {
  //     console.log(json)
  //     updateFavoriteFunc(json)
  //   })
  // }


//   export const loginFuncLoadingPage = () => {
//     const user = localStorage.getItem('autorized')
//     const userParce = JSON.parse(user)
//     // console.log(userParce.password)
//     signInWithEmailAndPassword(auth, userParce.email, userParce.password)
//     .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     currentUser = user.email
//     console.log(`Пользователь ${user.email} успешно авторизирован`)
//     // uid = user.uid
//     db = getFirestore(firebaseApp);
//     usersRef = collection(db, "users");
//     localStorage.setItem('user', user.email)
//     clearValueFunction()
//     //fetchArrayInDB()
//     fetchArrayWithDBAllNews()
//     fetchArrayWithDBFavoriteNews()
//     fetchArrayWithDBReedNews()
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorMessage)
//     if (errorCode == 'auth/user-not-found') {
//       alert('Email не знайдено. Потрібна реєстрація')
//     }
//     clearValueFunction()
//   });
// }