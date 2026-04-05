import ClientTipForm from "./ClientTipForm";

export default function TipPage() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center p-4 min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-purple/20 via-black to-black -z-10 pointer-events-none" />
      <ClientTipForm />
    </main>
  );
}
