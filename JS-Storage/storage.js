const notes = [
  {
    title: "A note",
    text: "First Note"
  },
  {
    title: "Another note",
    text: "Second Note"
  }
];
class Cookie {
  storeData(key, value) {
    document.cookie = `${key} = ${value}`;
  }
  getData(key) {
    let allCookieArray = document.cookie.split("; ");
    for (let i = 0; i < allCookieArray.length; i++) {
      let temp = allCookieArray[i].split("=");
      if (temp.indexOf(key) == 0) return temp[1];
    }
    return "";
  }
  deleteData(key) {
    document.cookie = `${key}= ; expires = Thu, 01 Jan 1970 00:00:00 UST;`;
  }
}

class Storage extends Cookie {
  constructor(localStorage) {
    super();
    this.localStorage = !!localStorage;
  }
  storeData(key, value) {
    if (!this.localStorage) {
      super.storeData(key, value);
      return;
    }
    localStorage.setItem(key, value);
  }
  getData(key) {
    if (!this.localStorage) {
      return super.getData(key);
    }
    return localStorage.getItem(key);
  }
  deleteData(key) {
    if (!this.localStorage) {
      super.deleteData();
      return;
    }
    localStorage.removeItem(key);
  }
}

const s1 = new Storage(false);
const s2 = new Storage(true);
s1.storeData("box", "data");
s2.storeData("new", JSON.stringify(notes));
document.getElementById("demo1").innerHTML = s1.getData("box");
document.getElementById("demo2").innerHTML = s2.getData("new");
