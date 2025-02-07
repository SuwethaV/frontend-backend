import React from "react";
import img1 from "../assets/mango.jpg";
import img2 from "../assets/alphonso.jpg";
import img3 from "../assets/banganapalli.jpg";
import img4 from "../assets/dasheri.jpeg";
import img5 from "../assets/himsagar.jpg";
import img6 from "../assets/imampasand.jpg";
import img7 from "../assets/kesar-mango.jpg";
import img8 from "../assets/langra.jpg";
import img9 from "../assets/malgova.jpg";

function Home() {
  const containerStyle = {
    backgroundColor: "#f7f5c9", // Pale yellow
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  };

  const heroSectionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px"
  };

  const heroTextStyle = {
    flex: "1",
    padding: "20px"
  };

  const heroImageStyle = {
    width: "40%",
    borderRadius: "10px"
  };

  const sectionHeadingStyle = {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "24px",
    fontWeight: "bold"
  };

  const varietiesGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    padding: "20px"
  };

  const mangoBoxStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#e3f7c9" // Pale green
  };

  const mangoImageStyle = {
    width: "100%",
    borderRadius: "10px"
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={heroSectionStyle}>
        <img src={img1} alt="Mango" style={heroImageStyle} />
        <div style={heroTextStyle}>
          <h1>Fresh, Juicy, Heavenly.</h1>
          <h2>100% Organic, vivid varieties of mangoes grown across India with heavenly taste.</h2>
          <p>
            We are a group of experienced mango growers from Tamil Nadu, a land known for its unparalleled soil,
            climate, and environment that foster the best mango varieties.
          </p>
        </div>
      </div>

      {/* Mango Varieties Section */}
      <h3 style={sectionHeadingStyle}>VARIETIES</h3>
      <div style={varietiesGridStyle}>
        {[ 
          { img: img2, name: "Alphonso", desc: "The 'king of mangoes' with a rich, sweet flavor and smooth texture." },
          { img: img3, name: "Banganapalli", desc: "Large, oblong mangoes with yellow skin and a sweet taste." },
          { img: img7, name: "Kesar", desc: "Known for its intense aroma and sweet, saffron-colored flesh." },
          { img: img4, name: "Dasheri", desc: "Sweet, juicy, and fiberless mangoes primarily grown in Uttar Pradesh." },
          { img: img8, name: "Langra", desc: "A unique sweet-tart mango primarily cultivated in Bihar." },
          { img: img9, name: "Malgova", desc: "Large, delicious mangoes highly esteemed in South India." },
        ].map((mango, index) => (
          <div style={mangoBoxStyle} key={index}>
            <img src={mango.img} alt={mango.name} style={mangoImageStyle} />
            <h4>{mango.name}</h4>
            <p>{mango.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
