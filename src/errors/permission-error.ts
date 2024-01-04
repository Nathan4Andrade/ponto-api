import { ApplicationError } from "@/protocols";

export function permissionError(): ApplicationError {
  return {
    name: "permissionError",
    message: "You don't have permission to change or access this data!",
  };
}
