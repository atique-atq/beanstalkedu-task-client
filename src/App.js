import Home from "./Components/Home/Home";
import { Toaster } from 'react-hot-toast';
import { toasterStyle } from "./utilities/utilities";

function App() {
  return (
    <div>
      <Home></Home>
      <Toaster toastOptions={toasterStyle}></Toaster>
    </div>
  );
}

export default App;
