export const validateData = (schema) => (req, res, next) => {
  try {
    const data = req.method === "GET" ? req.query : req.body; // 👈 Detecta si GET usa req.query
    schema.parse(data); // 🔹 Valida los datos sin importar de dónde vienen
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors.map((e) => e.message));
  }
};
