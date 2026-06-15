import { NextRequest } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  console.log("=== LOGIN API ROUTE CALLED ===");
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  
  try {
    // Parse the request body
    const body = await req.json();
    console.log("Request body received:", JSON.stringify(body, null, 2));
    
    // Validate required fields
    if (!body.email || !body.password) {
      console.log("Missing email or password");
      return new Response(
        JSON.stringify({ 
          success: false,
          message: "Email and password are required" 
        }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    console.log("Calling backend API:", `${process.env.NEXT_PUBLIC_API_URL}/login-agent`);
    console.log("Sending data:", { email: body.email, password: "***" });
    
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const resData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login-agent`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          email: body.email,
          password: body.password
        }),
      }
    );

    console.log("Backend response status:", resData.status);
    
    // Get the response text first
    const responseText = await resData.text();
    console.log("Backend raw response:", responseText);
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
      console.log("Parsed response data:", JSON.stringify(data, null, 2));
    } catch (e) {
      console.error("Failed to parse response as JSON:", e);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid response from authentication server"
        }),
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Handle successful login
    if (resData.ok && data?.status === "success" && data?.data?.token) {
      const token = data.data.token;
      const user = data.data.user;
      
      console.log("Login successful for:", user?.email);
      console.log("Token received:", token ? "Yes" : "No");
      
      // Set cookie
      const serializedCookie = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 1, // 1 day
        sameSite: "strict",
        path: "/",
      });
      
      const response = {
        success: true,
        data: {
          user: user,
          token: token
        },
        message: "Login successful"
      };
      
      console.log("Sending success response to client");
      
      return new Response(
        JSON.stringify(response),
        {
          status: 200,
          headers: {
            "Set-Cookie": serializedCookie,
            "Content-Type": "application/json"
          },
        }
      );
    }
    
    // Handle unsuccessful login
    const errorMessage = data?.message || data?.errors || "Invalid credentials";
    console.log("Login failed:", errorMessage);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: errorMessage
      }),
      { 
        status: resData.status || 401,
        headers: { "Content-Type": "application/json" }
      }
    );
    
  } catch (error: any) {
    console.error("Login API error:", error);
    console.error("Error stack:", error.stack);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Internal server error"
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}