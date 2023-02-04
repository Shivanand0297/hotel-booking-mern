export const userColumn = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
  },
  {
    field: "user",
    headerName: "User",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img src={params.row.img || " https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="avatar" className="cellImg" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 80,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
];


export const hotelColumn = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "type",
    headerName: "Type",
    width: 80,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
  },
];


export const roomColumn = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    width: 200,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Desc",
    width: 80,
  },
];