import PlanCard from "./PlanCard";

const plans = [
  {
    name: "Free",
    price: 0,
    features: ["Feature 1", "Feature 2", "Feature 3"],
    description: "Access to basic features",
    featuredHighlight: "Everything that our free plan includes...",
  },
  {
    name: "OmniStudy Plan",
    price: 10,
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    description: "Our most popular plan",
    featuredHighlight: "Everything that our free plan plus...",
  },
  {
    name: "Advanced Plan",
    price: 20,
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Feature 4",
      "Feature 5",
      "Feature 6",
    ],
    description: "Access to advanced features",
    featuredHighlight: "Everything we offer at Omnistudy",
  },
];

export default function Plan() {
  const handlePlanChange = () => {
    console.log("Plan changed");
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="border-b border-[#34354a] pb-4">
        <h2 className="text-xl">Plan Settings</h2>
        <p className="text-[#868686] text-sm">
          Pick a plan that suits your needs.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
}
