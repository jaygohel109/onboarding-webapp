import { Link } from "react-router-dom";
import "../CSS/HomePage.css"; // Import the custom CSS file

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-heading">Welcome to Zealthy 🚀</h1>
        <p className="home-subheading">Start your journey by signing up.</p>
        <Link to="/onboarding">
          <button className="home-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
