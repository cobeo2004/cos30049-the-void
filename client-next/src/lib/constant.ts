export const clientsImages = (numberOfClients: number = 14) =>
  [...new Array(numberOfClients)].map((client, index) => ({
    href: `/${index + 1}.png`,
  }));

export const products = [
  {
    title: "Home Page",
    link: "",
    thumbnail: "/p1.png",
  },
  {
    title: "Flight Prices",
    link: "/signed-in/flight-prices",
    thumbnail: "/p2.png",
  },
  {
    title: "Price Predictions",
    link: "/signed-in/flight-informations",
    thumbnail: "/p3.png",
  },

  {
    title: "Login Page",
    link: "/login",
    thumbnail: "/p4.png",
  },
  {
    title: "Explore Latest Products",
    link: "/",
    thumbnail: "/p5.png",
  },
  {
    title: "Flight Price Analysis",
    link: "/signed-in/flight-informations",
    thumbnail: "/p6.png",
  },

  {
    title: "Home Page",
    link: "",
    thumbnail: "/p1.png",
  },
  {
    title: "Flight Prices",
    link: "/signed-in/flight-prices",
    thumbnail: "/p2.png",
  },
  {
    title: "Price Predictions",
    link: "/signed-in/flight-informations",
    thumbnail: "/p3.png",
  },

  {
    title: "Login Page",
    link: "/login",
    thumbnail: "/p4.png",
  },
  {
    title: "Explore Latest Products",
    link: "/",
    thumbnail: "/p5.png",
  },
  {
    title: "Flight Price Analysis",
    link: "/signed-in/flight-informations",
    thumbnail: "/p6.png",
  },
  {
    title: "Home Page",
    link: "",
    thumbnail: "/p1.png",
  },
  {
    title: "Flight Prices",
    link: "/signed-in/flight-prices",
    thumbnail: "/p2.png",
  },
  {
    title: "Price Predictions",
    link: "/signed-in/flight-informations",
    thumbnail: "/p3.png",
  },
];
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
