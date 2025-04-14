export const colorFromStatus = (status: number) => {
  return status === 0
    ? "bg-red-100 text-red-800"
    : status === 1
      ? "bg-yellow-100 text-yellow-800"
      : status === 2
        ? "bg-green-100 text-green-800"
        : status === 3
          ? "bg-blue-100 text-blue-800"
          : status === 4
            ? "bg-purple-100 text-purple-800"
            : status === 5
              ? "bg-pink-100 text-pink-800"
              : status === 6
                ? "bg-gray-100 text-gray-800"
                : status === 7
                  ? "bg-orange-100 text-orange-800"
                  : "bg-blue-100 text-blue-800";
};
