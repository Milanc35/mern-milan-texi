import React from "react";
import ReactDOM from "react-dom";
import { Link, BrowserRouter as Router, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouterView from "./routes";

/******************** Theme ***************/
import "bootstrap/dist/css/bootstrap.min.css";
/******************** Theme over ***************/

const Index = () => {
    return (
        <div>
            <ToastContainer />
            <RouterView>
            </RouterView>
        </div>
    );
};

function initApp() {
    ReactDOM.render(<Index />, document.getElementById("app"));
}


if (module.hot) {
    module.hot.accept(() => {
        console.log("hot render");
        initApp();
    });
}
initApp();
