import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect root visitors directly to the showcase tip page we built
  redirect('/tip/elon');
}
