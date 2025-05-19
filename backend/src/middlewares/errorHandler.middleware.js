export default (err, req, res, next) => {
    console.error("❌ Error:", err);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Error interno del servidor',
        },
    });
};