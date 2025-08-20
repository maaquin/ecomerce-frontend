import React, { useEffect, useState } from "react";
import "./footer.css";

const Footer = ({ config }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (config && config) {
      setData(config)
    }
  })

  return (
    <footer className="footer-container">
      {data &&
        <>
          <div className="app-store-play">
            <h1>{data.name}</h1>
          </div>
          <div className="">
            <h2>Contáctanos</h2>
            <ul>
              <li>{data.adress}</li>
              <li className="contact-info-flex">
                Email :
                <a
                  target="_blank"
                  href={`mailto:${data.email}`}
                  className="icon-flex phone-icon"
                >
                  {data.email}
                </a>
              </li>
              <li className="contact-info-flex">
                Phone :{" "}
                <a
                  target="_blank"
                  href={`https://api.whatsapp.com/send?phone=${data.phone}`}
                  className="icon-flex phone-icon"
                >
                  +502 {data.phone}
                </a>
              </li>
            </ul>
          </div>
        </>}
    </footer>
  );
};

export default Footer;
