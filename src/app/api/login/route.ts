import { NextRequest } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.email || !body.password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and password are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const resData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login-agent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: body.email,
          password: body.password,
        }),
      }
    );
    console.log("resData", resData)

    const responseText = await resData.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid response from authentication server",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("data", data)

    // Backend nests the payload under `result`
    const result = data?.result;
    const token = result?.accessToken;
    const refreshToken = result?.refreshToken;
    const user = result?.user;
    console.log(user)

    // Handle successful login (backend returns 201 with success: true)
    if (resData.ok && data?.success === true && token) {
      const isProd = process.env.NODE_ENV === "production";

      const accessCookie = serialize("token", token, {
        httpOnly: true,
        secure: isProd,
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "strict",
        path: "/",
      });

      const refreshCookie = serialize("refreshToken", refreshToken ?? "", {
        httpOnly: true,
        secure: isProd,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "strict",
        path: "/",
      });

      const headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Set-Cookie", accessCookie);
      if (refreshToken) headers.append("Set-Cookie", refreshCookie);

      return new Response(
        JSON.stringify({
          success: true,
          data: { user, token },
          message: "Login successful",
        }),
        { status: 200, headers }
      );
    }

    // Handle unsuccessful login
    const errorMessage = data?.message || data?.errors || "Invalid credentials";

    return new Response(
      JSON.stringify({
        success: false,
        message: errorMessage,
      }),
      {
        status: resData.ok ? 401 : resData.status || 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Login API error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}