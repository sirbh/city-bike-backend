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
  

  const station = await db.stationDetails.findMany({
      where:{
        name:stationName
      }
  })

  return station
}

const getStationList = async (page:string,totalRecords:string)=>{

  const _page = parseInt(page)
  const _totalRecords = parseInt(totalRecords)

  const stations = await db.$transaction([
    db.stationDetails.count(),
    db.stationDetails.findMany({
      take: _totalRecords,
      skip: (_page - 1) * _totalRecords,
    }),
  ]);


  return {
    totalRecords:stations[0],
    journey:stations[1]
  }

}

export { searchStation, getStationDetails, getStationList};
