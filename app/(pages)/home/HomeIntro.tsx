import Image from "next/image";
import Navbar from "@/app/components/Navbar";

const HomeIntro = () => {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920&auto=format&fit=crop"
        alt="Fashion hero"
        fill
        priority
        className="object-cover"
      />
      <Navbar />
    </div>
  );
};

export default HomeIntro;
