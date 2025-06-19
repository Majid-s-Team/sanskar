import { Advertisement } from "../../types";

export const dashboardcolumns = [
  {
    title: "Product Name",
    dataIndex: "title",
  },
  {
    title: "Location",
    dataIndex: "address",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Owner Name",
    dataIndex: "owner_name",
    render: (_: string, record: Advertisement) => <p>{record?.user?.name}</p>,
  },
  {
    title: "Rent",
    dataIndex: "price_per_day",
    render: (text: string) => (
      <p className="text-[#4D4D4D] text-[14px]">
        {text}
        {/* {text ? parseFloat(text).toFixed(2) : 0} */}
      </p>
    ),
  },
  {
    title: "Status",
    dataIndex: "ad_status",
    render: (text: string) => (
      <p className="text-white text-[14px] py-1 w-[100px] bg-[#00B69B] text-center rounded-[40px]">
        {text}
      </p>
    ),
  },
];

export const dashboardData = [
  {
    title: "Product A",
    address: "New York",
    date: "2022-01-01 12:00:00",
    owner_name: "John Doe",
    price_per_day: "$1000.50",
    ad_status: "Available",
  },
  {
    title: "Product B",
    address: "Los Angeles",
    date: "2022-01-05 14:00:00",
    owner_name: "Jane Smith",
    price_per_day: "$800.25",
    ad_status: "Pending",
  },
  {
    title: "Product C",
    address: "Chicago",
    date: "2022-01-10 10:00:00",
    owner_name: "Bob Johnson",
    price_per_day: "$1200.00",
    ad_status: "Available",
  },
  {
    title: "Product D",
    address: "Houston",
    date: "2022-01-15 16:00:00",
    owner_name: "Alice Brown",
    price_per_day: "$900.75",
    ad_status: "Pending",
  },
  {
    title: "Product E",
    address: "Seattle",
    date: "2022-01-20 12:00:00",
    owner_name: "Mike Davis",
    price_per_day: "$1100.50",
    ad_status: "Available",
  },
];
