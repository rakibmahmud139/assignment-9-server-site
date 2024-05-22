type TOptions = {
  page?: number;
  limit?: number;
};

export const calculatePagination = (options: TOptions) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};
