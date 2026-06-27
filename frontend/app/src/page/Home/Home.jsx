
import Slider from "../../components/home/Slider";
import ContinerProduct from "../../components/home/products/ContinerProduct";


export default function Home() {
  return (
    <>
      {/* <SearchBar/> */}
      <Slider/>
      <ContinerProduct title={'Last Products'} />
      <ContinerProduct title={'Top Product'} />
    </>
  );
}
