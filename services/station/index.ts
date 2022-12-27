import db from "../../utils/database";

const searchStation = async (searchQuery: string) => {
  console.log(searchQuery);
  const stationsDetails = await db.stationDetails.findMany({
    where: {
      name: {
        startsWith: searchQuery,
        mode: "insensitive",
      },
    },
    take: 5,
    orderBy: {
      name: "asc",
    },
  });
  return stationsDetails;
};

const getStationDetails = async(stationName:string)=>{
  

  const station = db.stationDetails.findMany({
      where:{
        name:stationName
      }
  })

  return station
}

export { searchStation, getStationDetails};
