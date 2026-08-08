import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const resData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  );

  const data = await resData.json();

  console.log('register data', data);

  // Registration does NOT return a session token — the account is
  // "pending" until OTP verification, so we must NOT set an auth
  // cookie here. Doing so previously set a cookie with value
  // "undefined", which is exactly what let unverified users appear
  // logged in.
  if (data?.success === true) {
    const response = {
      data: data?.result,
    };
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } else {
    const response = {
      message: data?.message 
    };
    return new Response(JSON.stringify(response), {
      status: resData.status && resData.status >= 400 ? resData.status : 400,
    });
  }
}