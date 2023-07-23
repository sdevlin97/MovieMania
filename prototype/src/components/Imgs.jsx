import { useState } from "react";
import Nav from "./Nav";
import Partone from "./Partone";
import Parttwo from "./Parttwo";
import Aboutus from "./Aboutus";

const navigation = [
  { name: "Start", href: "#" },
  { name: "My List", href: "#" },
  { name: "Reccomendations", href: "#" },
  { name: "Browse", href: "#" },
];

const Imgs = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const backgroundImage = {
    backgroundImage: `url("./public/WallpaperDog-20552171.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div>
      <Nav></Nav>
      <Partone></Partone>
      <Aboutus></Aboutus>
      <Parttwo></Parttwo>
    </div>
  );
};

export default Imgs;
