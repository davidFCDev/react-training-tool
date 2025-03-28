const functions = require("firebase-functions");
const express = require("express");
const app = express();

const OpenAI = require("openai");
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY no está definida. Verifica tu .env.local");
}

const openai = new OpenAI({ apiKey });

const iaComplete = async (messages) => {
  try {
    const response = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });
    return JSON.parse(response.choices[0]?.message?.content);
  } catch (error) {
    console.error("Error al completar:", error);
    return null;
  }
};

app.get("/api/trainner", async (req, res) => {
  const { training_type, duration, observations } = req.query;

  if (!training_type || !duration) {
    return res
      .status(400)
      .json({ error: "Missing 'training_type' or 'duration' query parameter" });
  }

  const messages = [
    {
      role: "system",
      content: "Instrucciones para el modelo...",
    },
    {
      role: "user",
      content: `Entrenamiento de ${training_type} con una duración máxima de ${duration} minutos. ${observations ? `Observaciones: ${observations}` : ""}`,
    },
  ];

  try {
    const wod = await iaComplete(messages);

    if (!wod) {
      return res.status(500).json({
        error:
          "No fue posible generar el entrenamiento. Intenta de nuevo más tarde.",
      });
    }

    res.json({ id: new Date().getTime().toString(), training: wod });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.api = functions.https.onRequest(app);
