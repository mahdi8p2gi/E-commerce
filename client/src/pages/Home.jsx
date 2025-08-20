import BestSeller from "../components/BestSeller"
import BottomBanner from "../components/BottomBanner"
import Categories from "../components/Categories"
import Cookies from "../components/Cookies"
import MainBanner from "../components/MainBanner"
import NewsLetter from "../components/NewLetter"
import ScrollToTopButton from "../components/ScrollToTopButton";
import Testimonial from "../components/Testimonial"
function Home() {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Cookies />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <Testimonial />
      <NewsLetter />  
      <ScrollToTopButton />
    </div>
  )
}

export default Home
