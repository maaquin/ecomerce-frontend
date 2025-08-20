
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useVerifyLink, useVerifyToken } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import toast from "react-hot-toast";
import './ClientData.css'

const ClientData = ({ cartItems, checkOut }) => {
    const [searchParams] = useSearchParams();
    const [step, setStep] = useState("loading");
    const [captchaValue, setCaptchaValue] = useState(null);
    const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(true);
    const [formData, setFormData] = useState({
        address: "",
        name: "",
        email: "",
        phone: "",
        bill: "",
        comment: "",
    });

    const { verifyLink, loading: verifying } = useVerifyLink();
    const { verifyToken, loading: sending } = useVerifyToken();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            verifyToken(token).then(data => {
                if (data.valid) {
                    setFormData(prev => ({ ...prev, email: data.email }));
                    setStep("form");
                } else {
                    setStep("email");
                }
            });
        } else {
            setStep("email");
        }
    }, [searchParams]);

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        if (!captchaValue) {
            toast.error('Por favor completa el captcha')
            return;
        }
        toast.promise(
            verifyLink(formData.email, captchaValue),
            {
                loading: 'Enviando correo...',
                success: (data) => {
                    return 'Correo enviado';
                },
                error: (err) => err.message || 'Error al enviar el correo, intenta más tarde',
            }
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            bill: formData.bill.trim().toLowerCase() === "cf" ? "" : formData.bill.trim(),
        };
        if (checkOut) {
            checkOut(dataToSend);
        } else {
        }
    };

    if (step === "loading") {
        return <LoadingSpinner />;
    }

    // Paso de verificación por email + captcha
    if (step === "email") {
        return (
            <div className="client-form-container">
                <form onSubmit={handleSubmitEmail} className="cliente-form">
                    <div className="form-field">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input-text"
                            maxLength={200}
                            style={{marginBottom: '10px'}}
                        />
                    </div>
                    <ReCAPTCHA
                        sitekey='6LdNhKYrAAAAAC1F_mIHv0j01UfeiMgc7Wwc_CFv'
                        onChange={setCaptchaValue}
                    />
                    <button className="checkout" type="submit">Enviar enlace de verificación</button>
                </form>
            </div>
        );
    }

    return (
        <div className="client-form-container">
            <form className="cliente-form" onSubmit={handleSubmit}>
                <div className="form-cart-grid">
                    {/* Formulario */}
                    <div className="form-section">
                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="address">Dirección de envío:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    autoComplete="shipping address-line1"
                                    className="input-text"
                                    maxLength={500}
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="name">Nombre y apellido:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                    className="input-text"
                                    maxLength={150}
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="email">Correo electrónico de contacto:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    className="input-text"
                                    maxLength={200}
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="phone">Número telefónico de contacto:</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    autoComplete="tel"
                                    title="Ingrese un número telefónico válido"
                                    className="input-text"
                                    maxLength={10}
                                />
                            </div>

                            <div className="form-field full-width">
                                <label htmlFor="bill">
                                    Datos de facturación:
                                </label>
                                <input
                                    type="text"
                                    id="bill"
                                    name="bill"
                                    value={formData.bill}
                                    onChange={handleChange}
                                    autoComplete="billing address-line1"
                                    className="input-text"
                                    placeholder="dejar en blanco o 'cf' si es consumidor final"
                                    maxLength={500}
                                />
                            </div>

                            <div className="form-field full-width">
                                <label htmlFor="comment">Comentario extra para el repartidor:</label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Ejemplo: tocar timbre 2 veces"
                                    className="input-textarea"
                                    maxLength={500}
                                />
                            </div>
                        </div>
                    </div>

                    <aside className="cart-section">
                        <h3>Pedido</h3>
                        <ul className="cart-list">
                            {cartItems.map(({ productId, name, price, qty, discount }) => (
                                <li key={productId} className="cart-item">
                                    <span className="cart-name">{name}</span>
                                    <span className="cart-qty">x{qty}</span>
                                    <span className="cart-price">Q{(price * (1 - discount / 100) * qty).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-total">
                            Total: Q
                            {cartItems
                                .reduce((acc, item) => acc + item.price * (1 - item.discount / 100) * item.qty, 0)
                                .toFixed(2)}
                        </div>

                        <button type="submit" className="checkout">
                            Finalizar pedido
                        </button>
                    </aside>
                </div>
            </form>
        </div>
    );
}

export default ClientData;