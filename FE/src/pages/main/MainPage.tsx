import ListPatients from "../../features/lists/list-patients";
import Footer from "../../components/footer/Footer";
import './style.scss'

const MainPage = () => {
  return (
      <div className="container">
        <ListPatients />
        <Footer />
      </div>
  )
}

export default MainPage
