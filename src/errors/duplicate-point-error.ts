import { ApplicationError } from "@/protocols";

export function duplicatePointError(): ApplicationError {
  return {
    name: "duplicatePointError",
    message: "There is already a point registered for this user today",
  };
}
