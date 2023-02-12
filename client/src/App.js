import React from "react";
import HomeLayoutHoc from "./layouts/DefaultHOC";
import Master from "./Master";

import Temp from "./components/Temp";


function App() {
  return (
    <>
      <HomeLayoutHoc  path="/" exact component={Temp} />
      <HomeLayoutHoc path="/:type"  component={Master} />
    </>
  );
}

export default App;
