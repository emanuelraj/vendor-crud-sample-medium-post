interface Page {
  pageNumber: string;
  pageSize: string;
}

const queryBuilder = async ({
  search,
  filter,
  page,
  sort
}: {
  search: string;
  filter: any;
  page?: Page;
  sort: string;
}) => {
  let pageNumber = 1;
  let pageSize = 100;
  let searchQuery = {};
  let sortBy: Array<[string, number]> = [];

  if (search) {
    const trimmed = search.trim();
    const regSearch = new RegExp(trimmed, "i");

    searchQuery = {
      $or: [
        { email: { $regex: regSearch } },
        { username: { $regex: regSearch } },
        { firstName: { $regex: regSearch } },
        { lastName: { $regex: regSearch } },
        { status: { $regex: regSearch } },
        { phoneNumber: { $regex: regSearch } },
        { customerStripeId: { $regex: regSearch } },
        { role: { $regex: regSearch } }
      ]
    };
  }

  if (page) {
    pageNumber = Number(page.pageNumber);
    pageSize = Number(page.pageSize);
  }

  if (sort) {
    sortBy = sort.split(",").map((e: string) => {
      return e.startsWith("-") ? [e.replace("-", ""), -1] : [e, 1];
    }, []);
  }

  const query = { ...filter, ...searchQuery };
  const options = {
    pageNumber,
    pageSize,
    sortBy: sortBy.length ? sortBy : undefined
  };

  return { query, options };
};

export default queryBuilder;
