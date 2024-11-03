import { useState } from "react";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FaRubleSign } from "react-icons/fa6";

const PasswordUpdate = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to handle password strength check
  const checkPasswordStrength = (password: string) => {
    if (password.length < 6) {
      setPasswordStrength(1); // Too weak
    } else if (password.length < 10) {
      setPasswordStrength(2); // Weak
    } else if (
      password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{10,}$/
      )
    ) {
      setPasswordStrength(4); // Strong
    } else {
      setPasswordStrength(3); // Moderate
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);
    checkPasswordStrength(password);
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      setLoading(false);

      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);

      return;
    }

    if (passwordStrength < 3) {
      setError("Password strength should be at least moderate");
      setLoading(false);

      return;
    }

    setError(null);

    // Placeholder for submission logic, e.g., API call
    console.log("Form submitted:", {
      currentPassword,
      newPassword,
      confirmPassword,
    });

    // Reset fields after submission
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordStrength(0);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Security</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current password
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          placeholder="Enter current password"
        />
        <a
          href="#"
          className="text-xs text-indigo-600 hover:underline mt-1 inline-block"
        >
          Forgot current password?
        </a>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          placeholder="Enter new password"
        />
        <div className="flex items-center space-x-2 mt-2">
          {/* Password strength indicators with progressive colors */}
          <div
            className={`w-8 h-2 rounded-full ${
              passwordStrength >= 1 ? "bg-red-500" : "bg-gray-300"
            }`}
          />
          <div
            className={`w-8 h-2 rounded-full ${
              passwordStrength >= 2 ? "bg-orange-400" : "bg-gray-300"
            }`}
          />
          <div
            className={`w-8 h-2 rounded-full ${
              passwordStrength >= 3 ? "bg-yellow-400" : "bg-gray-300"
            }`}
          />
          <div
            className={`w-8 h-2 rounded-full ${
              passwordStrength === 4 ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        </div>
        <span className="text-sm text-gray-600 mt-1 block">
          {passwordStrength === 1 && "Too weak"}
          {passwordStrength === 2 && "Weak"}
          {passwordStrength === 3 && "Moderate"}
          {passwordStrength === 4 && "Strong"}
        </span>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm new password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          placeholder="Re-enter new password"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <Button
        variant="default"
        type="submit"
        className="w-full h-14 bg-[--primary] hover:bg-[--primary-hover] text-white hover:text-white font-bold"
      >
        {loading ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
};

export default PasswordUpdate;
