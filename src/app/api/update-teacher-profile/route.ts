import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PATCH(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const resData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/update-teacher-profile`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    }
  );

  const data = await resData.json();

  // console.log(data);

  if (data?.status == true) {
    const response = {
      message: data?.message,
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      // headers: { "Set-cookie": serialized },
    });
  } else {
    const response = {
      message: data,
    };
    return new Response(JSON.stringify(response), {
      status: 400,
    });
  }
}
