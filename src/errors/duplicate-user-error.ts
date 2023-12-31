import { ApplicationError } from "@/protocols";

export function duplicatedUserError(): ApplicationError {
  return {
    name: "DuplicatedUserError",
    message: "There is already an user",
  };
}
