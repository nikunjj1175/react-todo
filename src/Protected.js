import React from "react";
import Header from "./Header1";

function Protected() {
    return (
        <>
            <Header />
            <div>
                <h1>LogIn Page</h1>
                <input type="text" /><br />
                <input type="text" /><br />
                <button>Login</button>
            </div>
        </>
    )
}

export default Protected;   