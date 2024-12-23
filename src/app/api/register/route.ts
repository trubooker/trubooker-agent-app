import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const resData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/register/agent`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  );

  const data = await resData.json();
  console.log(data);

  const token = data?.data?.token;

  const serialized = serialize(`token`, token, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`,
    maxAge: 60 * 60 * 24 * 1, // 1 day
    sameSite: `strict`,
    path: `/`,
  });

  if (data?.status == "success") {
    const response = {
      data: data?.data,
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-cookie": serialized },
    });
  } else {
    const response = {
      message: data?.errors,
    };
    return new Response(JSON.stringify(response), {
      status: 400,
    });
  }
}
