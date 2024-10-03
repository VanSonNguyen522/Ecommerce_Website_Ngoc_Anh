import DashboardLayout from "../DashboardLayout";
import UserCreateForm from "./components/UserCreateForms";
import UserList from "./components/UserList";
const UserDashBoardPage = () => {
    return (
      // <div className="flex flex-col mx-auto p-6">
      //   <h1 className="text-2xl font-bold mb-6">Create a New Product</h1>
      //   <ProductForm />
      // </div>
      <DashboardLayout>
          <h1 className="text-2xl font-bold mb-6">User Dashboard Page</h1>
          <UserCreateForm/>
          <UserList />
      </DashboardLayout>
    );
  };
  
  export default UserDashBoardPage;