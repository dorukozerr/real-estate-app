import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";

const imagekitioPrivateKey = process.env.IMAGEKITIO_PRIVATE_KEY;

if (!imagekitioPrivateKey) {
  throw new Error("imagekitio private key not defined!");
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || crypto.randomUUID();

  const expire =
    searchParams.get("expire") ||
    (Math.floor(Date.now() / 1000) + 2400).toString();

  const signature = crypto
    .createHmac("sha1", imagekitioPrivateKey)
    .update(token + expire)
    .digest("hex");

  return NextResponse.json({
    token,
    expire,
    signature,
  });
};
