import Image from "next/image";

import Picker from "./components/picker";


export default function Home() {
  return (
      <main className="flex h-full justify-center align-center">
          <Picker></Picker>
      </main>
  );
}
