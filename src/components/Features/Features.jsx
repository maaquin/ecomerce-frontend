import React from 'react';
import './features.css';

const Features = () => {
  const data = [
    {
      cover: 'fa-solid fa-hand-holding-dollar',
      title: "Pago Contra Entrega",
      desc: "Ofrecemos la opción de pagar en efectivo al momento de recibir tu pedido, para mayor comodidad y seguridad.",
    },
    {
      cover: 'fa-solid fa-motorcycle',
      title: "Envío a Domicilio",
      desc: "Llevamos tus productos hasta la puerta de tu casa de forma rápida y segura dentro de tu zona local.",
    },
    {
      cover: 'fa-solid fa-comments',
      title: "Atención Personalizada",
      desc: "Puedes contactarnos directamente por WhatsApp o redes sociales para resolver cualquier duda o hacer pedidos especiales.",
    },
  ]
  return (
    <>
      <section className="wrapper background">
        <div className="container grid2">
          {data.map((value, index) => {
            return (
              <div className="product" key={index}>
                <div className="img icon-circle" >
                  <i className={value.cover}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Features