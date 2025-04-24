'use client';
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
      "username": username,
      "role": "customer",
      "orders": [{ "Item Name": "NIL", "Price": 0, "Qty": 0 }],
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

const getData = (mail: string) => {
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

const getOrderUser = async (email: string) => {
  email = email.replaceAll(".", ",")
  const endpoint = ref(database, `Users/${email}/orders`);
  const snapshot = await get(endpoint);
  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    return null;
  }
}

const placeOrder = async (email: string, ItemName: string, qty: number) => {
  const endpoint = ref(database);
  const snapshot = await get(endpoint);
  if (!snapshot.exists()) return;
  const data = snapshot.val();
  const userKey = email.replaceAll(".", ",");
  let price = 0;
  const itemIndex = data["Items"].findIndex((item) => item["Item Name"] == ItemName);
  if (itemIndex === -1) {
    console.log("Item not found");
    return;
  }
  const item = data["Items"][itemIndex];
  if (item["Stock"] < qty) {
    console.log("Low on stock");
    return;
  }
  price = item["Price"];
  item["Stock"] -= qty;
  const order = {
    "Item Name": item["Item Name"],
    "Price": item["Price"] * qty,
    "Qty": qty
  };
  if (!data["Users"][userKey]["orders"]) {
    data["Users"][userKey]["orders"] = [];
  }
  data["Users"][userKey]["orders"].push(order);
  var order_global = data["Sales"]["orders"];
  order_global["amount"] += item["Price"] * qty;
  order_global["order_list"].push({
    "Item Name": item["Item Name"],
    "Price": item["Price"] * qty,
    "Qty": qty,
    "User": email.replaceAll(".", ",")
  });

  const earningEntry = data["Earning"].find((entry) => entry["Item Name"] == ItemName);
  if (earningEntry) {
    earningEntry["Earnings"] += qty * price;
  }
  await set(endpoint, data);
};

const removeOrder = async (email: string, index: number, global_item: Map<string, any>) => {
  const endpoint = ref(database);
  const snapshot = await get(endpoint);
  if (snapshot.exists()) {
    var data = snapshot.val()
    var order_endpoint = data["Sales"]["orders"]
    order_endpoint["amount"] -= global_item["Price"];
    var l_1 = [];
    for (var i = 0; i < order_endpoint["order_list"].length; i++) {
      console.log("fk no", JSON.stringify(order_endpoint["order_list"][i]), JSON.stringify(global_item), JSON.stringify(order_endpoint["order_list"][i]) == JSON.stringify(global_item));
      if (JSON.stringify(order_endpoint["order_list"][i]) == JSON.stringify(global_item)) {
        console.log("bohahahah", JSON.stringify(order_endpoint["order_list"][i]));
        continue;
      }
      l_1.push(order_endpoint["order_list"][i])
    }
    console.log(l_1);
    order_endpoint["order_list"] = l_1
    var earning_endpoint = data["Earning"]
    for (var i = 0; i < earning_endpoint.length; i++) {
      if (earning_endpoint[i]["Item Name"] == global_item["Item Name"]) {
        earning_endpoint[i]["Earnings"] -= parseInt(global_item["Price"].toString())
      }
    }
    var user_endpoint = data["Users"][email.replaceAll(".", ",")]["orders"]
    user_endpoint = user_endpoint.slice(0, index).concat(user_endpoint.slice(index + 1, user_endpoint.length))
    data["Users"][email.replaceAll(".", ",")]["orders"] = user_endpoint
    console.log("endpoint", user_endpoint)
    await set(endpoint, data)
    console.log("Removed");
  } else {
    console.log("Doesnt work lol")
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
    return 1;
  }).catch((e) => {
    console.log(e.message)
    return 0;
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

const getUsers = async () => {
  const endpoint = ref(database, "Users")
  const snapshot = await get(endpoint)
  if (snapshot.exists()) {
    return snapshot.val()
  }
}

const getOrderEmp = async () => {
  const endpoint = ref(database, "Sales/orders/order_list")
  const snapshot = await get(endpoint);
  if (snapshot.exists()) {
    return snapshot.val()
  }
}


export { database, getUsers, getOrderEmp, getOrderUser, placeOrder, initializeUser, getData, userSignIn, salesChange, getItemData, getGraphData, removeOrder, getSalesData, getEarningData }
