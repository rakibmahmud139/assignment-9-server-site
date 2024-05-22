export type TPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string | undefined;
  sortOrder?: string | undefined;
};

const USER_ROLE = {
  user: "user",
  admin: "admin",
} as const;

export type TUserRole = keyof typeof USER_ROLE;
