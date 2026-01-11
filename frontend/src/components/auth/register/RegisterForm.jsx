import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { CheckCircle, ChevronLeft, ChevronRight, UserPlus } from "lucide-react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import { FaGoogle } from "react-icons/fa";

export default function RegisterForm() {
  const router = useRouter();
  const { register, checkUserExists, googleLogin, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const handleGoogleLogin = useCallback(async () => {
    try {
      await googleLogin();
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    }
  }, [googleLogin]);

  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: "",
    email: "",
    username: "",

    // Step 2: Security
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationPassed, setValidationPassed] = useState({
    username: false,
    email: false,
  });

  const validateStep = (step) => {
    let tempErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        tempErrors.fullName = "Full name is required";
      }

      if (!formData.email) {
        tempErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = "Email address is invalid";
      }

      if (!formData.username.trim()) {
        tempErrors.username = "Username is required";
      } else if (formData.username.length < 3) {
        tempErrors.username = "Username must be at least 3 characters";
      }
    }

    if (step === 2) {
      if (!formData.password) {
        tempErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        tempErrors.password = "Password must be at least 6 characters";
      }

      if (!formData.confirmPassword) {
        tempErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = "Passwords do not match";
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Reset validation status when field changes
    if (name === "username" || name === "email") {
      setValidationPassed((prev) => ({ ...prev, [name]: false }));
    }

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const nextStep = async () => {
    if (!validateStep(currentStep)) return;

    // For step 1, check if username or email is already taken
    if (currentStep === 1) {
      try {
        setIsSubmitting(true);
        // Check if username or email exists
        const { exists: usernameExists, message: usernameMessage } =
          await checkUserExists({
            username: formData.username,
          });

        if (usernameExists) {
          setErrors((prev) => ({ ...prev, username: usernameMessage }));
          setValidationPassed((prev) => ({ ...prev, username: false }));
          setIsSubmitting(false);
          return;
        } else {
          setValidationPassed((prev) => ({ ...prev, username: true }));
        }

        const { exists: emailExists, message: emailMessage } =
          await checkUserExists({
            email: formData.email,
          });

        if (emailExists) {
          setErrors((prev) => ({ ...prev, email: emailMessage }));
          setValidationPassed((prev) => ({ ...prev, email: false }));
          setIsSubmitting(false);
          return;
        } else {
          setValidationPassed((prev) => ({ ...prev, email: true }));
        }

        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        toast.error("An error occurred. Please try again.");
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Submit registration data
      const userData = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const { success, error, data } = await register(userData);

      if (success) {
        toast.success("Registration successful!");
        router.push("/dashboard"); // Redirect to dashboard page
      } else {
        toast.error(error || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step indicators
  const StepIndicator = () => (
    <div className="flex justify-center items-center mb-8">
      {[...Array(totalSteps)].map((_, idx) => (
        <div key={idx} className="flex items-center">
          <div
            className={`rounded-full transition-all flex items-center justify-center ${
              idx + 1 === currentStep
                ? "bg-purple-500 text-white"
                : idx + 1 < currentStep
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-400"
            } h-8 w-8 text-sm font-medium`}
          >
            {idx + 1 < currentStep ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              idx + 1
            )}
          </div>
          {idx < totalSteps - 1 && (
            <div
              className={`h-1 w-12 mx-1 ${
                idx + 1 < currentStep ? "bg-green-500" : "bg-gray-700"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            formData={formData}
            errors={errors}
            validationPassed={validationPassed}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <StepTwo
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-white tracking-tight">
          Create your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            account
          </span>
        </h1>
        <p className="mb-6 text-gray-300">
          Join Snapora to create and share AI-generated imagery
        </p>
      </motion.div>

      {/* Step Indicator */}
      <StepIndicator />

      {/* Multi-step Form Container */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        <form
          onSubmit={
            currentStep === totalSteps
              ? handleSubmit
              : (e) => e.preventDefault()
          }
        >
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            {currentStep > 1 ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={prevStep}
                className="flex items-center px-6 py-3 rounded-xl text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back
              </motion.button>
            ) : (
              <div></div> // Empty div for flex spacing
            )}

            {currentStep < totalSteps ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium transition-all duration-300 flex items-center justify-center"
                >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Checking...
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg shadow-purple-500/20"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <UserPlus className="ml-2 h-5 w-5" />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>

      <button
        onClick={handleGoogleLogin}
        className="flex justify-center items-center py-2.5 px-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors w-full text-white gap-2 cursor-pointer mt-5"
      >
        <FaGoogle className="size-4" />
        <span>Continue with Google</span>
      </button>

      {/* Login Link */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
