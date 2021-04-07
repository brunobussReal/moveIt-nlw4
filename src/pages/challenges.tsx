import fetch from "isomorphic-unfetch";
import React from "react";

const Challenge: React.FC = ({ data }: any) => {
  return <div>{JSON.stringify(data)}</div>;
};

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3000/api/challenges");
  const json = await res.json();
  return {
    props: {
      data: json,
    },
  };
}

export default Challenge;
