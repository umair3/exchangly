import { useCallback } from "react";
import * as yup from "yup";

interface Validate {
  isValid: boolean;
  isEmpty: boolean;
  error: string | null;
  email?: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Please enter valid email"),
});

export function useEmail() {
  const validate = useCallback(async (email: string): Promise<Validate> => {
    if (!email) {
      return {
        isValid: false,
        isEmpty: true,
        error: "Email is required",
      };
    }
    try {
      const { emailVal } = await schema.validate({ email: email });
      return {
        isValid: true,
        isEmpty: false,
        error: null,
        email: emailVal,
      };
    } catch (error: any) {
      return {
        isValid: false,
        isEmpty: false,
        error: error?.message || error.errors[0],
      };
    }
  }, []);

  return { validate };
}
