import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import TagCarousel from '../modules/categoryCarousel/TagCarousel'

const Home = () => {
  return (
    <>
        <div>
            <div>
                <Navbar />
            </div>
            <div>
              <Carousel />
            </div>
            <div>
              <TagCarousel />
            </div>
        </div>
    </>
  )
}

export default Home