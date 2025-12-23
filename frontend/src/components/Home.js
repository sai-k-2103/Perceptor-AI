import Login from "./login.js";
const Home = function () {
  document.title = "home";
  const b1 = localStorage.getItem("authToken");
  return (
    <div className="home">
      <h1>
        welcome to <br />
        preceptor!!!
      </h1>
      {!b1 && <Login></Login>}
      {b1 && <h3>Please select the options from above</h3>}
    </div>
  );
};
export default Home;
