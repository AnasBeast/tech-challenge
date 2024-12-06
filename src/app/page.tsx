import Image from "next/image";
import AccountBalance from "./components/AccountBalance";
import TransactionForm from "./components/TransactionForm";
import AccountStatement from "./components/AccountStatement";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Banking App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AccountBalance />
          <TransactionForm />
        </div>
        <AccountStatement />
      </div>
    </main>

  );
}
