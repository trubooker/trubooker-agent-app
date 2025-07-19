import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const resData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/forgot-password-agent`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  );

  const data = await resData.json();

  console.log(data);

  if (data?.status == "success") {
    const response = {
      message: data?.data,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } else {
    const response = {
      message: data?.error,
    };
    return new Response(JSON.stringify(response), {
      status: 400,
    });
  }
}
