import DashboardLayout from "../DashboardLayout";
import EditUserForm from "./components/EditUsersForms";
import UserCreateForm from "./components/UserCreateForms";
import UserList from "./components/UserList";
const UserDashBoardPage = () => {
    // const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    return (
      <DashboardLayout>
          <h1 className="text-2xl font-bold mb-6">User Dashboard Page</h1>
          <UserCreateForm/>
          <UserList />
          <EditUserForm/>
      </DashboardLayout>
    );
  };
  
  export default UserDashBoardPage;