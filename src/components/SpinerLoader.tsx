import { ThreeCircles } from "react-loader-spinner";

const SpinerLoader = () => {
  return (
    <div className="flex justify-center mt-4">
      <ThreeCircles visible={true} height="100" width="100" color="#4fa94d" ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass="" />
    </div>
  );
};

export default SpinerLoader;
