import { BadgeCheck, MessageCircle, Trophy } from "lucide-react";

const BENEFITS = [
  {
    icon: BadgeCheck,
    title: "SECURE TRANSACTIONS",
    description: "Transactions Are Handled With Bank-Grade Security.",
  },
  {
    icon: Trophy,
    title: "SIMPLE CHECKOUT",
    description: "Our Secure Checkout Is Quick And Easy To Use.",
  },
  {
    icon: MessageCircle,
    title: "GET IN TOUCH",
    description: "Have Questions? Get In Touch With Us At Any Time.",
  },
];

const ShopBenefits = () => {
  return (
    <section className="bg-[#f5f2ec] px-3.5 py-5 pb-14 text-[#222] sm:px-7 md:px-8 md:py-8 md:pb-24 lg:px-12 lg:py-12 lg:pb-28 xl:py-14 xl:pb-">
      <div className="mx-auto grid gap-10 md:grid-cols-3 md:gap-10 lg:gap-16">
        {BENEFITS.map(({ icon: Icon, title, description }) => (
          <article key={title}>
            <Icon size={25} strokeWidth={1.25} />
            <h2 className="mt-5 text-xl font-bold leading-tight lg:text-xl">
              {title}
            </h2>
            <p className="mt-2.5 max-w-xl text-sm leading-tight lg:text-sm xl:mt-3 xl:text-base">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
export default ShopBenefits;
