import axios from "axios";

// La URL base de tu API en producción
export const url = 'https://ecomerce-backend-ten.vercel.app/century/v1';

// Creamos una instancia de Axios para no repetir la configuración
const apiClient = axios.create({
    baseURL: url,
    timeout: 15000 // Un timeout de 15 segundos es más que suficiente
});

// --- BILL ---
/**
 * Crea una nueva factura (pedido).
 * @param {object} billData - Los datos de la factura.
 */
export const createBill = async (billData) => {
    try {
        return await apiClient.post('/bill', billData);
    } catch (e) {
        console.error("Error creating bill:", e.response?.data || e.message);
        return { error: true, e };
    }
};

/**
 * Obtiene una factura por su código de seguimiento.
 * @param {string} billCode - El código de la factura.
 */
export const getBillById = async (billCode) => {
    try {
        return await apiClient.get(`/bill/${billCode}`);
    } catch (e) {
        console.error("Error fetching bill:", e.response?.data || e.message);
        return { error: true, e };
    }
};

// --- CATEGORY ---
/**
 * Obtiene todas las categorías de productos que están habilitadas.
 */
export const getAllCategorys = async () => {
    try {
        // La ruta /category ahora devuelve solo las habilitadas
        return await apiClient.get('/category/good');
    } catch (e) {
        console.error("Error fetching categories:", e.response?.data || e.message);
        return { error: true, e };
    }
};

/**
 * Obtiene una categoría específica por su ID.
 * @param {number} categoryId - El ID de la categoría.
 */
export const getCategory = async (categoryId) => {
    try {
        return await apiClient.get(`/category/${categoryId}`);
    } catch (e) {
        console.error("Error fetching category:", e.response?.data || e.message);
        return { error: true, e };
    }
};

// --- PRODUCT ---
/**
 * Obtiene todos los productos que están habilitados.
 */
export const getAllProducts = async () => {
    try {
        // La ruta /product ahora devuelve solo los habilitados
        return await apiClient.get('/product/good');
    } catch (e) {
        console.error("Error fetching products:", e.response?.data || e.message);
        return { error: true, e };
    }
};

/**
 * Obtiene un producto específico por su ID.
 * @param {number} productId - El ID del producto.
 */
export const getProduct = async (productId) => {
    try {
        return await apiClient.get(`/product/${productId}`);
    } catch (e) {
        console.error("Error fetching product:", e.response?.data || e.message);
        return { error: true, e };
    }
};

// --- IMAGE ---
/**
 * Sube un archivo de imagen a Cloudinary.
 * @param {FormData} formData - El FormData que contiene el archivo.
 */
export const uploadImg = async (formData) => {
    try {
        // Es importante enviar con el header correcto, Axios lo hace por ti con FormData
        return await apiClient.post('/img', formData);
    } catch (e) {
        console.error("Error uploading image:", e.response?.data || e.message);
        return { error: true, e };
    }
};

// --- CONFIG ---
/**
 * Obtiene la configuración general del sitio.
 */
export const getConfig = async () => {
    try {
        return await apiClient.get('/config/front');
    } catch (e) {
        console.error("Error fetching config:", e.response?.data || e.message);
        return { error: true, e };
    }
};

/**
 * Verifica un token de un solo uso para la confirmación de correo.
 * @param {string} token - El token a verificar.
 */
export const verifyToken = async (token) => {
    try {
        return await apiClient.get(`/config/verify?token=${token}`);
    } catch (e) {
        console.error("Error verifying token:", e.response?.data || e.message);
        return { error: true, e };
    }
};

/**
 * Solicita el envío de un enlace de verificación por correo.
 * @param {object} data - Contiene el email y el captcha.
 */
export const verifyLink = async (data) => {
    try {
        return await apiClient.post('/config/verify', data);
    } catch (e) {
        console.error("Error sending verification link:", e.response?.data || e.message);
        return { error: true, e };
    }
};