import FAQ from "@/app/components/FAQ";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#f5f2ec]">
      <Navbar dark />
      <FAQ />
    </main>
  );
}
