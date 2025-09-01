import { useContext, useEffect } from "react";
import useRouteElement from "./useRouteElement";
import { localStorageEventTarget } from "./utils/auth";
import { AppContext } from "./Context/app.context";

function App() {
  const routeElements = useRouteElement();
  const { reset } = useContext(AppContext);
  useEffect(() => {
    localStorageEventTarget.addEventListener("clearLS", reset);
    return () => {
      localStorageEventTarget.removeEventListener("clearLS", reset);
    };
  }, [reset]);
  return <div>{routeElements}</div>;
}
export default App;
