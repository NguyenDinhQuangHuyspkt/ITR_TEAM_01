import ListPatients from "../../features/lists/list-patients";
import Footer from "../../components/footer/Footer";
import './style.scss';

const MainPage = () => {
  return (
    <>
      <div className="main-layout">
        <div className="main-content">
          <ListPatients />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default MainPage;
