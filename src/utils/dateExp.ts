const today = new Date();
const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() > 8
            ? today.getMonth() + 1
            : "0" + (today.getMonth() + 1)) +
      "-" +
      (today.getDate() > 9 ? today.getDate() : "0" + today.getDate());

const time =
      (today.getHours() > 9 ? today.getHours() : "0" + today.getHours()) +
      ":" +
      (today.getMinutes() > 9 ? today.getMinutes() : "0" + today.getMinutes()) +
      ":" +
      (today.getSeconds() > 9 ? today.getSeconds() : "0" + today.getSeconds());

const nowDate = date.split("-").join("");
const nowTime = time.split(":").join("");
const dateNow = parseInt(`${nowDate}${nowTime}`);
export default dateNow