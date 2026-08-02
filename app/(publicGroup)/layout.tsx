import { Navbar } from "@/components/shared/Navbar";
import React from "react";
import { getMe } from "../service/getMe";

const PublicGroupLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const user = await getMe();
  return (
    <div>
      <Navbar user={user}/>
      {children}
    </div>
  );
};

export default PublicGroupLayout;
