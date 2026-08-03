import React from "react";

const PublicGroupLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div>{children}</div>;
};

export default PublicGroupLayout;
