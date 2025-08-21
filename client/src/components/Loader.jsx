
import "../index.css"; 

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <span
        className="
          relative inline-block
          w-[75px] h-[100px] 
          sm:w-[75px] sm:h-[100px] 
          md:w-[75px] md:h-[100px] 
          bg-no-repeat animate-pillerPushUp
        "
        style={{
          backgroundImage: `
            linear-gradient(#25b09b 50px, transparent 0),
            linear-gradient(#25b09b 50px, transparent 0),
            linear-gradient(#25b09b 50px, transparent 0),
            linear-gradient(#25b09b 50px, transparent 0),
            linear-gradient(#25b09b 50px, transparent 0)
          `,
          backgroundSize: "8px 100%",
          backgroundPosition:
            "0px 90px, 15px 78px, 30px 66px, 45px 58px, 60px 50px",
        }}
      >
        <span
          className="
            absolute bottom-[10px] left-0 
            w-[12px] h-[12px]
            rounded-full bg-[#25b09b] animate-ballStepUp
          "
        ></span>
      </span>
    </div>
  );
};

export default Loader;
