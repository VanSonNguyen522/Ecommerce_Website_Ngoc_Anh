import DashboardLayout from "../DashboardLayout";
import CartUserList from "./components/CartUserList";
const UserCartDashBoardPage = () => {
    // const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    return (
      <DashboardLayout>
          <h1 className="text-2xl font-bold mb-6">Cart Dashboard Page</h1>
          <CartUserList/>
      </DashboardLayout>
    );
  };
  
  export default UserCartDashBoardPage;