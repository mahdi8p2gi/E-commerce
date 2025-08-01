import BestSeller from "../components/BestSeller"
import BottomBanner from "../components/BottomBanner"
import Categories from "../components/Categories"
import MainBanner from "../components/MainBanner"
import NewsLetter from "../components/NewLetter"
import ScrollToTopButton from "../components/ScrollToTopButton";
function Home() {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />  
       <ScrollToTopButton />
    </div>
  )
}

export default Home
