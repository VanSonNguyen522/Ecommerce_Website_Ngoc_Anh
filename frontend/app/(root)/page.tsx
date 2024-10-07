
import { getServerSession } from "next-auth";
import HomePage from "../pages/HomePage/HomePage";
import { authOptions } from "@/libs/AuthOptions";


const App: React.FC = async () => {
  const  session = await getServerSession(authOptions)
  return (
    <div>
      {/* <div>Hello: {session?.user?.email}</div> */}
      <HomePage/>
    </div>
  );
};

export default App;


