import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
    useGetAllCategorys,
    useGetConfig,
    useGetAllProducts,
    useCreateBill,
    useGetProduct
} from "../../shared/hooks";

export const DashboardPage = () => {
    const { getAllCategorys, allCategorys, isFetching: isCategoryFetching } = useGetAllCategorys();
    const { getConfig, config, isFetching: isConfigFetching } = useGetConfig();
    const { getAllProducts, allProducts, isFetching: isProductFetching } = useGetAllProducts();
    const { createBill, isLoading } = useCreateBill();
    const { getProduct, product } = useGetProduct();

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        getAllCategorys(),
            getConfig(),
            getAllProducts()
    }, []);

    useEffect(() => {
        const storeToCart = localStorage.getItem('cart');
        const storedCart = JSON.parse(storeToCart);

        const fetchProducts = async () => {
            const productsWithQty = await Promise.all(
                storedCart.map(async ({ productId, qty }) => {
                    const data = await getProduct(productId);
                    return data ? { ...data.data[0], qty } : null;
                })
            );

            setCartItems(productsWithQty.filter(Boolean));
        };

        fetchProducts();

        localStorage.removeItem('cart');
        localStorage.setItem('cart', storeToCart);
    }, []);

    useEffect(() => {
        const cartToStore = cartItems.map(item => ({
            productId: item.productId,
            qty: item.qty
        }));
        localStorage.setItem('cart', JSON.stringify(cartToStore));
    }, [cartItems]);

    if (isCategoryFetching || isConfigFetching || isProductFetching) {
        return <LoadingSpinner />;
    }

    const addToCart = (product, quantity = 1) => {
        const productExists = cartItems.find((item) => item.productId === product.productId);

        if (productExists) {
            setCartItems(
                cartItems.map((item) =>
                    item.productId === product.productId
                        ? { ...item, qty: item.qty + quantity }
                        : item
                )
            );
            toast.success(`Increased quantity by ${quantity}`);
        } else {
            setCartItems([...cartItems, { ...product, qty: quantity }]);
            toast.success(`Added ${quantity} to cart`);
        }
    };

    function generateBillCode({ name }) {
        const nombreSinEspacios = name.replace(/\s+/g, '');
        const fechaHora = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 12);
        const random = Math.floor(1000 + Math.random() * 9000);
        return `${nombreSinEspacios}-${fechaHora}-${random}`;
    }

    const deleteFromCart = (product) => {
        const productExists = cartItems.find((item) => item.productId === product.productId);
        if (productExists.qty === 1) {
            const shouldRemove = window.confirm(
                "Are you sure you want to remove this item from the cart?"
            );

            if (shouldRemove) {
                setCartItems(cartItems.filter((item) => item.productId !== product.productId));
                toast.success("Item removed from cart");
            }
        } else {
            setCartItems(
                cartItems.map((item) =>
                    item.productId === product.productId
                        ? { ...productExists, qty: productExists.qty - 1 }
                        : item
                )
            );
            toast.success("Item quantity decreased");
        }
    };
    // This function is used for the checkout button it takes cartItems as input and if the length of items in it is 0 it alerts add something to cart first
    const checkOut = async (data) => {
        if (cartItems.length <= 0) {
            toast.error("Por favor agrega un producto antes de hacer el pedido");
        } else {
            const confirmOrder = true;

            if (confirmOrder) {

                const address = data.address;
                const name = data.name;
                const email = data.email;
                const phone = data.phone;
                const bill = data.bill;
                const comment = data.comment;
                const metodPayment = 'efectivo';
                const status = 'pedido recibido';
                const total = cartItems.reduce(
                    (price, item) => price + item.qty * item.price * (1 - item.discount / 100),
                    0
                );
                const discount = cartItems.reduce(
                    (price, item) => price + item.qty * item.price * (item.discount / 100),
                    0
                );
                const tax = '0';
                const shipment = 35.00;
                const products = cartItems.map(({ discount, name, price, qty, productId }) => ({ discount, name, price, qty, productId }));
                const billCode = generateBillCode({ name });

                try {
                    const data = await toast.promise(
                        createBill({ address, name, email, phone, bill, comment, metodPayment, status, total, discount, tax, shipment, products, billCode }),
                        {
                            loading: 'Confirmando pedido...',
                            success: () => 'Pedido realizado',
                            error: (err) => err.message || 'Error al solicitar el pedido, intenta más tarde',
                        }
                    );

                    // ✅ Solo si salió bien
                    setCartItems([]);
                    navigate('/');
                } catch (error) {
                    // ❌ Si falla, no borramos carrito ni navegamos
                    console.error("Error creando pedido:", error);
                }
            }
        }
    };

    // This function removes an item from the cart entirely, filtering out the values which doesn't have the same id as those clicked
    const removeFromCart = (product) => {
        const shouldRemove = window.confirm(
            "Are you sure you want to remove this item from the cart?"
        );

        if (shouldRemove) {
            setCartItems(cartItems.filter((item) => item.productId !== product.productId));
            toast.success("Item removed from cart");
        }
    };

    return (
        <div className="dashboard-container">
            <Content
                categorys={allCategorys || []}
                config={config || []}
                products={allProducts || []}

                removeFromCart={removeFromCart}
                cartItems={cartItems}
                addToCart={addToCart}
                deleteFromCart={deleteFromCart}
                checkOut={checkOut}
            />
        </div>
    );
};

