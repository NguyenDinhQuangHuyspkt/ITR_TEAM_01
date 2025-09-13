import ListPatients from "../../features/lists/list-patients";
// import Footer from "./Footer";
import './style.scss';

const MainPage = () => {
  return (
    <>
      <div className="main-content">
        <ListPatients />
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default MainPage;
