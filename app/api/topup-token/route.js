import midtransClient from "midtrans-client";

export async function POST(req) {
  const body = await req.json();

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });

  const parameter = {
    transaction_details: {
      order_id: "order-" + Date.now(),
      gross_amount: body.amount,
    },
    customer_details: {
      email: body.email,
    },
  };

  const token = await snap.createTransactionToken(parameter);
  return Response.json({ token });
}
