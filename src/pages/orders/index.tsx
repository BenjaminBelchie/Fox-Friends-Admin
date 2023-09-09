import Lottie from 'react-lottie-player';
import lottieJson from '~/constants/animations/bear-animation.json';

export default function OrdersPage() {
  return (
    <div className="flex">
      <div className=" w-full">
        <p className="border-b pb-3 text-5xl font-medium">Orders</p>
        <div className="flex flex-col items-center justify-center">
          <Lottie
            loop
            animationData={lottieJson}
            play
            style={{ width: 150, height: 150 }}
          />
          <p className="text-xl font-bold">This page is under construction</p>
          <p>Please enjoy this dancing bear whilst you wait.</p>
        </div>
      </div>
    </div>
  );
}
