import { Navbar } from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { getMe } from "../service/getMe";

async function HomePage() {
  const user = await getMe();
  return (
    <div>
      Hello, Nextjs!
      <h1>Home page</h1>
    </div>
  );
}

export default HomePage;
