import ClientTipForm from "./ClientTipForm";
import GridDistortion from "@/components/GridDistortion";

export default function TipPage() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center p-4 min-h-screen relative overflow-hidden">
      {/* Subtle radial gradient background glow (purple/blue tones) */}
      <div className="absolute inset-0 bg-black -z-30" />
      
      {/* 3D Distorted Grid Background */}
      <div className="absolute inset-0 -z-20 opacity-60">
        <GridDistortion
          imageSrc="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          grid={15}
          mouse={0.2}
          strength={0.15}
          relaxation={0.9}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(60,20,150,0.15)_0%,_rgba(0,0,0,0)_60%)] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(20,80,200,0.1)_0%,_rgba(0,0,0,0)_50%)] -z-10 pointer-events-none" />
      
      <ClientTipForm />
    </main>
  );
}
