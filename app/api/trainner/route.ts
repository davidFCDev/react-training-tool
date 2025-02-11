/* eslint-disable prettier/prettier */

import OpenAI from "openai";

import { ChatMessage } from "@/types";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY no está definida. Verifica tu .env.local");
}

const openai = new OpenAI({
  apiKey,
});

const iaComplete = async (messages: ChatMessage[], model: string) => {
  try {
    const response = await openai.chat.completions.create({
      messages,
      model,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Response content is null");
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Error al completar:", error);

    return null;
  }
};

async function generate_training(training_type: string, duration: number) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `
      Compórtate como un entrenador deportivo. Te voy a compartir el tipo de entreno y el tiempo máximo de duración y quiero que generes un entrenamiento aleatorio correspondiéndose a la categoría y tiempo que te he pasado. Responde siempre en español.
      No añadas un número delante de cada ejercicio como si fuera una lista, solamente escribe los ejercicios con sus repeticiones.
      No añadas ningún tipo de anotación extra, solo los ejercicios con sus repeticiones.
      Si el tiempo no se ajusta exactamente al tiempo que te he pasado, no pasa nada, pero intenta que sea lo más cercano posible.
      Si el tiempo excede el tiempo máximo, simplemente omite ejercicios.
      Si el tiempo es menor al tiempo máximo, añade ejercicios adicionales.
      Aunque tengas algún problema con los tiempos, sigue adelante y genera el entrenamiento.
      Quiero que te guíes por otros entrenamientos de Crossfit, Hyrox o Endurance para generar el entrenamiento, como pueden ser los que se conocen como "Hero WODs" o "Benchmark WODs".
      
      🔹 **Formato**:  
      - Usa saltos de línea para separar ejercicios.  
      - NO uses números en listas, solo guiones (-) para cada ejercicio.  
      - **Separa las secciones con títulos en MAYÚSCULAS y líneas de guiones**.  
      - **Cada ejercicio en una línea diferente**.  
      - NO incluyas explicaciones, solo devuelve un JSON válido.

      🔹 **Ejemplo de salida JSON (correcto)**:
      {
        "type": "Crossfit",
        "warmup": "-5 min de rowing\\n- 10 min mobility\\n\\n2 Rounds\\n- 10 Cat Cow\\n- 5+5 Shoulder Cars\\n- 10 PVC Passthroughs\\n- 30\\\" Bottom OH Squat Hold",
        "strength": "Snatch\\n- 5x2 @ 70% 1RM\\n\\nStrict Pull Ups\\n4 Sets\\n- 4x6 Pull Ups Estrictos\\n- 8/12 Ring Rows 2020",
        "metcon": "4 Rounds\\n- 10 Toes to Bar\\n- 12 Dumbbell Snatch (30/20kg)\\n- 10 Burpees over the Dumbbell",
        "accessory": "3 Rounds\\n- 10/10 Single Arm Dumbbell Rows\\n- 10/10 Single Arm Dumbbell Press\\n- 10/10 Single Arm Dumbbell Curls"
      }

      🔹 **Ejemplo incorrecto (NO hacerlo)**:
      {
        "warmup": "5 min de rowing, 10 min mobility, 2 Rounds - 10 Cat Cow, 5+5 Shoulder Cars..."
      }

      Recuerda: **Cada sección debe empezar con su título en mayúsculas y estar bien formateada**.
      Devuelve **solo un JSON válido** sin explicaciones ni comentarios extra.
      `,
    },
    {
      role: "user",
      content: `Entrenamiento de Hyrox con una duración máxima de 60 minutos`,
    },
    {
      role: "assistant",
      content: `
      {
        "type": "Hyrox",
        "warmup": "- 5 min de rowing\\n- 10 min mobility\\n\\n2 Rounds\\n- 10 Cat Cow\\n- 5+5 Shoulder Cars\\n- 10 PVC Passthroughs\\n- 30\\\" Bottom OH Squat Hold",
        "strength": "",
        "metcon": "2 Rounds For Time\\n- 200m Run\\n- 20/15 CAL SkiErg\\n- 200m Run\\n- 20m Sled Push (60/40kg)\\n- 200m Run\\n- 20 Db Snatch (22.5/15kg)\\n- 200m Run\\n- 20 Burpees over the Db\\n- 200m Run\\n- 20/15 CAL Row\\n- 200m Run\\n- 40m Heavy Farmers Carry (2x32/24kg)\\n- 200m Run\\n- 20m Back Rack Walking Lunges\\n- 200m Run\\n- 20 Wall Balls (9/6kg)",
        "accessory": ""
      }
      `,
    },
    {
      role: "user",
      content: `Entrenamiento de Crossfit con una duración máxima de 75 minutos`,
    },
    {
      role: "assistant",
      content: `
      {
        "type": "Crossfit",
        "warmup": "- 5 min de rowing\\n- 10 min mobility\\n\\n2 Rounds\\n- 10 Cat Cow\\n- 5+5 Shoulder Cars\\n- 10 PVC Passthroughs\\n- 30\\\" Bottom OH Squat Hold",
        "strength": "Snatch\\n- 5x2 @ 70% 1RM\\n\\nStrict Pull Ups\\n4 Sets\\n- 4x6 Pull Ups Estrictos\\n- 8/12 Ring Rows 2020",
        "metcon": "4 Rounds\\n- 10 Toes to Bar\\n- 12 Dumbbell Snatch (30/20kg)\\n- 10 Burpees over the Dumbbell",
        "accessory": "3 Rounds\\n- 10/10 Single Arm Dumbbell Rows\\n- 10/10 Single Arm Dumbbell Press\\n- 10/10 Single Arm Dumbbell Curls"
      }
      `,
    },
    {
      role: "user",
      content: `Entrenamiento de Endurance con una duración máxima de 75 minutos`,
    },
    {
      role: "assistant",
      content: `
      {
        "type": "Endurance",
        "warmup": "- 5 min de Assault Bike\\n- 10 min mobility\\n\\n2 Rounds\\n- 10 World’s Greatest Stretch (5/side)\\n- 10 Leg Swings (front & side)\\n- 30\\\" High Knees\\n- 30\\\" Butt Kicks",
        "metcon": "3 Rounds For Time\\n- 400m Run\\n- 500/400m Row\\n- 400m Run\\n- 25/20 CAL SkiErg\\n- 400m Run\\n- 40m Sled Push (50/35kg)\\n- 400m Run\\n- 20 Box Jump Overs (24/20”)",
        "accessory": "3 Rounds\\n- 12 Bulgarian Split Squats (6/side)\\n- 15 Hollow Rocks\\n- 20 Russian Twists (10/side)"
      }
      `,
    },
    {
      role: "user",
      content: `Entrenamiento de ${training_type} con una duración máxima de ${duration} minutos`,
    },
  ];

  return await iaComplete(messages, "gpt-3.5-turbo");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const training_type = searchParams.get("training_type");
  const durationStr = searchParams.get("duration");

  // Param validation
  if (!training_type || !durationStr) {
    return new Response(
      JSON.stringify({
        error: "Missing 'training_type' or 'duration' query parameter",
      }),
      { status: 400 }
    );
  }

  const duration = Number(durationStr);

  if (isNaN(duration) || duration <= 0) {
    return new Response(
      JSON.stringify({
        error: "Duration must be a positive number",
      }),
      { status: 400 }
    );
  }

  try {
    const wod = await generate_training(training_type, duration);

    if (!wod) {
      return new Response(
        JSON.stringify({
          error:
            "It was not possible to generate the training. Please try again later.",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        id: new Date().getTime().toString(),
        training: wod,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    const errorMessage = (error as Error).message;

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
