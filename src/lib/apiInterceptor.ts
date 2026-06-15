// lib/apiInterceptor.ts
export const setupApiInterceptors = () => {
  // Intercept fetch requests
  const originalFetch = window.fetch;
  
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    
    if (response.status === 401) {
      console.log("401 Unauthorized detected, redirecting to /");
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      window.location.href = "/";
    }
    
    return response;
  };
};

// Call this in your app's root layout or _app.tsx
export const initApiInterceptors = () => {
  if (typeof window !== 'undefined') {
    setupApiInterceptors();
  }
};