"use server"

import { revalidatePath } from "next/cache"

type MailchimpResponse = {
  success: boolean
  message: string
}

// Función para convertir el valor del asunto a texto completo
// IMPORTANTE: Debe coincidir exactamente con los valores configurados en Mailchimp
function getAsuntoText(asunto: string): string {
  const asuntoMap: Record<string, string> = {
    exportacion: "Información sobre exportación",
    importacion: "Información sobre importación",
    productos: "Información sobre productosice", // Nota: mantener el typo que está en Mailchimp
    cotizacion: "Solicitud de cotización",
    otro: "Otro",
  }

  return asuntoMap[asunto] || "Otro"
}

export async function subscribeToMailchimp(formData: FormData): Promise<MailchimpResponse> {
  try {
    const email = formData.get("email") as string
    const nombre = formData.get("nombre") as string
    const apellido = formData.get("apellido") as string
    const telefono = (formData.get("telefono") as string) || ""
    const mensaje = formData.get("mensaje") as string
    const asuntoKey = formData.get("asunto") as string

    // Convertir el asunto a texto completo que coincida con Mailchimp
    const asuntoText = getAsuntoText(asuntoKey)

    console.log("Datos recibidos en el servidor:", {
      email,
      nombre,
      apellido,
      telefono,
      mensaje,
      asuntoKey,
      asuntoText,
    })

    // Verificar que los campos críticos no estén vacíos
    if (!email || !nombre || !apellido) {
      return {
        success: false,
        message: "Por favor completa todos los campos requeridos.",
      }
    }

    // Obtener las credenciales de Mailchimp desde variables de entorno
    const apiKey = process.env.MAILCHIMP_API_KEY
    const listId = process.env.MAILCHIMP_LIST_ID

    if (!apiKey || !listId) {
      console.error("Faltan credenciales de Mailchimp")
      return {
        success: false,
        message: "Error de configuración del servidor. Por favor, contacte al administrador.",
      }
    }

    const dataCenter = apiKey.split("-")[1] || "us1"

    // Construir los datos para Mailchimp con los valores exactos configurados
    const data = {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: nombre,
        LNAME: apellido,
        PHONE: telefono,
        SUBJECT: asuntoText, // Usar el texto exacto que está en Mailchimp
        MESSAGE: mensaje || "No hay mensaje",
      },
    }

    console.log("Datos enviados a Mailchimp:", JSON.stringify(data))

    // Hacer la solicitud a la API de Mailchimp
    const response = await fetch(`https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/members`, {
      method: "POST",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()
    console.log("Respuesta de Mailchimp:", response.status, JSON.stringify(responseData))

    // Si el correo ya existe, Mailchimp devuelve un código 400
    if (response.status === 400 && responseData.title === "Member Exists") {
      // Crear hash MD5 del email para la URL de actualización
      const crypto = await import("crypto")
      const emailHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex")

      // Actualizar el miembro existente
      const updateResponse = await fetch(
        `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/members/${emailHash}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `apikey ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            merge_fields: data.merge_fields,
          }),
        },
      )

      const updateData = await updateResponse.json()
      console.log("Respuesta de actualización:", updateResponse.status, JSON.stringify(updateData))

      if (updateResponse.ok) {
        return {
          success: true,
          message: "Hemos actualizado tu información. ¡Gracias por contactarnos!",
        }
      } else {
        return {
          success: false,
          message: "No pudimos actualizar tu información. Por favor, intenta nuevamente.",
        }
      }
    }

    if (!response.ok) {
      console.error("Error en respuesta de Mailchimp:", responseData)
      return {
        success: false,
        message: `Error: ${responseData.detail || "Hubo un problema al procesar tu solicitud"}`,
      }
    }

    revalidatePath("/contacto")
    return {
      success: true,
      message: "¡Gracias por contactarnos! Te responderemos a la brevedad.",
    }
  } catch (error) {
    console.error("Error al suscribir a Mailchimp:", error)
    return {
      success: false,
      message: "Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.",
    }
  }
}
