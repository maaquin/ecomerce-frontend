import { useEffect, useState } from 'react';
import { useGetBill } from '../../shared/hooks'
import './Tracking.css'
import toast from 'react-hot-toast';

const Tracking = () => {
    const [input, setInput] = useState(null);
    const [data, setData] = useState(null);

    const { getBill, bill } = useGetBill();

    

    useEffect(() => {
        if (bill) {
            setData(bill.data[0]);
        }
    }, [bill])

    const handleClick = async () => {
        if (input) {
            toast.promise(
                getBill(input),
                {
                    loading: 'Buscando pedido...',
                    success: (data) => {
                        return 'Pedido encontrado';
                    },
                    error: (err) => err.message || 'Error al encontrar el pedido, revisa que tu codigo sea correcto',
                }
            );
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="tracking-container">
            <h1 className="tracking-title">Rastreo de Pedido</h1>
            <p className="tracking-subtitle">
                Ingresa tu código de seguimiento para consultar el estado de tu pedido.
            </p>

            <div className="tracking-form">
                <input
                    type="text"
                    className="tracking-input"
                    placeholder="Ejemplo: ABC123456"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="tracking-button" onClick={handleClick}>Rastrear</button>
            </div>

            <div className="tracking-result">
                <h2 className="result-title">Estado del pedido</h2>
                {bill && data ? (
                    <div className="bill">
                        <section>
                            <p><strong>Estado:</strong> {data.status}</p>
                            <p><strong>Fecha:</strong> {formatDate(data.timeStamp)}</p>
                            <p><strong>Cliente:</strong> {data.name}</p>
                        </section>

                        <section>
                            <h2>Total de compra</h2>
                            <p><strong>{data.total}</strong></p>
                        </section>

                        <section>
                            <h2>Productos</h2>
                            <div>
                                {data.products && data.products.length > 0 ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                                <th>Precio</th>
                                                <th>SubTotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.products.map((p, i) => (
                                                <tr key={p.productId}>
                                                    <td>{i + 1}</td>
                                                    <td>{p.name}</td>
                                                    <td>{p.qty}</td>
                                                    <td>{p.price * (1 - p.discount / 100)}</td>
                                                    <td>{p.price * (1 - p.discount / 100) * p.qty}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No hay productos en este pedido.</p>
                                )}
                            </div>
                        </section>

                        <section>
                            <h2>Comentario / Instrucciones</h2>
                            <p>{data.comment && data.comment.trim() !== "" ? data.comment : "Sin comentarios o instrucciones de entrega."}</p>
                        </section>
                    </div>
                ) : (
                    <p className="result-placeholder">
                        Aquí se mostrará la información del pedido.
                    </p>
                )}

            </div>
        </div>
    );
}

export default Tracking;