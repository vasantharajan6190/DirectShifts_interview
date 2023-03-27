import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "../../routes";


const Body = () => {
    return(
        <Suspense fallback={<p>...Loading</p>}>
        <Router>
          <AppRouter/>
        </Router>
      </Suspense>
    )
}

export default Body;