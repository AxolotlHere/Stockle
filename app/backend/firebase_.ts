// Import the functions you need from the SDKs you need
import { unsubscribe } from "diagnostics_channel";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, onValue, ref, set, off, get } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4Yi8VdiqEuvifKxDjPMFGnhdMwVWkmXk",
  authDomain: "stockle-3d6fc.firebaseapp.com",
  databaseURL: "https://stockle-3d6fc-default-rtdb.firebaseio.com",
  projectId: "stockle-3d6fc",
  storageBucket: "stockle-3d6fc.firebasestorage.app",
  messagingSenderId: "1018883074941",
  appId: "1:1018883074941:web:110be97844cb362999ba14",
  measurementId: "G-9QFCP4DHFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const initializeUser = (username: string, mail: string, password: string) => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, mail, password).then().catch(
    (error: Error) => {
      alert(error.message)
    }
  )
  console.log("the value : ", !mail.split("@")[1].includes("vitstudent"))
  if (!mail.split("@")[1].includes("vitstudent")) {
    set(ref(database, `Users/${mail.replaceAll(".", ",")}`), {
      "username": { username },
      "role": "customer",
      "orders": [""],
      "history": [""],
      "cart": [""]
    })
  } else {
    set(ref(database, `Users/${mail.replaceAll(".", ",")}`), {
      "username": { username },
      "role": "employee",
    })
  }
}

const getData = (mail: string, passwd: string) => {
  const endpoint = ref(database, `Users/${mail.replaceAll(".", ",")}`)
  onValue(
    endpoint, (value) => {
      const data = value.val()
      console.log(data)
    }
  )
}

const getItemData = async () => {
  const endpoint = ref(database, "Items")
  const snapshot = await get(endpoint)
  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    return null;
  }
}

const getGraphData = async () => {
  const endpoint = ref(database, "Sales")
  const snapshot = await get(endpoint)
  if (snapshot.exists()) {
    return snapshot.val()["sales_list"]
  } else {
    return null;
  }
}


const getSalesData = async () => {
  const endpoint = ref(database, "Sales")
  const snapshot = await get(endpoint)
  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    return null;
  }
}
const getEarningData = async () => {
  const endpoint = ref(database, "Earning")
  const snapshot = await get(endpoint)
  if (snapshot.exists()) {
    var l_1 = snapshot.val()
    for (var i = 0; i < l_1.length; i++) {
      for (var j = 0; j < l_1.length - i - 1; j++) {
        if (l_1[j]["Earnings"] < l_1[j + 1]["Earnings"]) {
          var temp = l_1[j]
          l_1[j] = l_1[j + 1]
          l_1[j + 1] = temp
        }
      }
    }
    return l_1
  } else {
    return null;
  }
}
const userSignIn = (mail: string, passwd: string) => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, mail, passwd).then((creds) => {
    const user = creds.user;
    console.log(user);

  }).catch((e) => {
    alert(e.message)
  })
}


const salesChange = () => {
  const saleRef = ref(database, "Sales");

  const unsubscribe = onValue(saleRef, async (snapshot) => {
    const data = snapshot.val();
    const lastUpdate = new Date(data["last_update"]);
    const now = new Date();

    if (lastUpdate.getMonth() !== now.getMonth()) {
      data["sales_list"] = data["sales_list"];
      data["sales_list"]["final_pdt"] = data["sales_list"]["final_pdt"];
      data["sales_list"]["Raw"] = data["sales_list"]["Raw"]
      data["sales_list"]["final_pdt"].push(data["final_pdt"]);
      data["sales_list"]["Raw"].push(data["Raw"]);
      data["last_update"] = now.toLocaleString();
      data["final_pdt"] = 0;
      data["Raw"] = 0;
      try {
        await set(saleRef, data);
        unsubscribe();
        off(saleRef);
      } catch (err) {
        alert(err);
      }
    }
  });
}


export { database, initializeUser, getData, userSignIn, salesChange, getItemData, getGraphData, getSalesData, getEarningData }
