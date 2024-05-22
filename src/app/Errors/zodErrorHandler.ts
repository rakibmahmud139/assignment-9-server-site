import { ZodError } from "zod";

export const zodErrorHandler = (err: ZodError) => {
  const errStr = JSON.parse(err.message);
  const message = errStr
    .map(
      (er: { path: any[]; message: any }) => `${er.path[1]} is ${er.message}`
    )
    .join(". ");

  const errorDetails = err.issues.map((issue) => {
    return {
      field: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    message,
    errorDetails,
  };
};
