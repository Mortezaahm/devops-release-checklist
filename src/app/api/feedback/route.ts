type FeedbackPayload = {
  message: string;
};

function isValidFeedback(
  payload: unknown
): payload is FeedbackPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "message" in payload &&
    typeof payload.message === "string" &&
    payload.message.trim().length > 0 &&
    payload.message.length <= 500
  );
}

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch (error) {
    console.error("[feedback] Invalid JSON body", {
      error:
        error instanceof Error
          ? error.message
          : "Unknown parsing error",
    });
    return Response.json(
      {
        error: "Request body must be valid JSON.",
      },
      {
        status: 400,
      }
    );
  }

  if (!isValidFeedback(payload)) {
    console.error("[feedback] Invalid payload", {
      reason:
        "Message must be a non-empty string with a maximum of 500 characters.",
    });
    return Response.json(
      {
        error:
          "Message must be a non-empty string with a maximum of 500 characters.",
      },
      {
        status: 400,
      }
    );
  }

  console.info("[feedback] Feedback received", {
    messageLength: payload.message.trim().length,
    timestamp: new Date().toISOString(),
  });
  return Response.json(
    {
      success: true,
      message: "Feedback received successfully.",
    },
    {
      status: 201,
    }
  );
}
