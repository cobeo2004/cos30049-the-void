import { MeteorCard } from "./MeteorCard";
import { useRouter } from "next/navigation";
export default function ExploreLatestProduct() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] py-20 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto px-4">
        <h2 className="text-6xl font-bold text-center md:-mt-10 mb-20 bg-gradient-to-r from-[#0B76B7] to-[#1C5BD9] bg-clip-text text-transparent">
          Explore our latest product.
        </h2>
        <div className="flex flex-col items-center md:flex-row gap-8 justify-center">
          <MeteorCard
            title="Flight Prices"
            description="Explore the best flight prices and book your next flight with ease."
            buttonText="Explore"
            buttonFunction={() => {
              router.push("/signed-in/flight-prices");
            }}
          />
          <MeteorCard
            title="Flight Information"
            description="Analyze the flight information and predict the delays."
            buttonText="Explore"
            buttonFunction={() => {
              router.push("/signed-in/flight-informations");
            }}
          />
        </div>
      </div>
    </div>
  );
}
