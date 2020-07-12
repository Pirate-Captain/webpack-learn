const config = require("./config.json");
import styles from "./Greeter.css";

module.exports = function () {
    let greet = document.createElement("div");
    greet.setAttribute("class", styles.root);
    greet.textContent = config.greetText;
    return greet;
};