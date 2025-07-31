import { Input } from "postcss";
import { assets } from "../assets/assets";

const inputField = () => {
  <input type="text" />;
};

function addAddress() {
    const onSubmitHandler = ()=> {
        
    }
  return (
    <div className="pb-16 mt-16">
      <p className="text-2xl text-gray-500 md:text-3xl">Add Shipping</p>{" "}
      <span className="font-semibold text-primary">Address</span>
      <div className="flex flex-col-reverse mt-10 md:flex-row judtify-between">
        <div className=""></div>
        <img className="mb-16 md:mr-16 md:mt-0" src={assets.add_address_iamge}  alt="add address" />
      </div>
    </div>
  );
}

export default addAddress;
