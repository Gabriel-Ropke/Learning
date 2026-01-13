import { verifyImageUrl } from "../utils/verifyImageUrl.js";

export const validateProduct = (req, res, next) => {
  const name = req.body.name?.trim();
  const price = Number(req.body.price);
  const image = req.body.image?.trim();

  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Por favor, preencha todos os campos",
    });
  }

  if (name.length < 5 || name.length > 15) {
    return res.status(400).json({
      success: false,
      message: "O nome deve ter entre 5 e 15 caracteres",
    });
  }

  if (price < 0.1 || price > 100000) {
    return res.status(400).json({
      success: false,
      message: "Preço inválido",
    });
  }

  if (!verifyImageUrl(image)) {
    return res.status(400).json({
      success: false,
      message: "URL da imagem inválida",
    });
  }

  // sobrescreve com dados normalizados
  req.body.name = name;
  req.body.price = price;
  req.body.image = image;

  next();
};
