const Header = () => {
    return (
      <header className="flex items-center justify-between bg-white shadow px-6 py-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
  
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-800">John Doe</span>
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </header>
    );
  };
  
  export { Header };
  