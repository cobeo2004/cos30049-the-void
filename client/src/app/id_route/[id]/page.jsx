import React from "react";
import { useRouteParams } from "hooks/useRouteParams";

const IdRoutePage = () => {
  const { id } = useRouteParams();

  return <div>IdRoutePage is: {id}</div>;
};

export default IdRoutePage;
