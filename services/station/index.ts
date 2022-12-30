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
    select:{
      id:true,
      name:true,
      station_id:true,
    },
    take: 5,
    orderBy: {
      name: "asc",
    },
  });
  return stationsDetails;
};

const getStationDetails = async(id:string,station_id:string)=>{
  
  const _id = parseInt(id)
  const _station_id = parseInt(station_id)

  const data = await db.$transaction([
    db.stationDetails.findUniqueOrThrow({
      where:{
         id:_id
      }
    }),
    db.journey.count({
      where:{
        departure_station_id:_station_id
      }
    }),
    db.journey.count({
      where:{
        return_station_id:_station_id
      }
    }),
    db.journey.aggregate({
      _avg:{
        covered_distance:true
      },
      where:{
        departure_station_id:_station_id
      },
    }),
    db.journey.aggregate({
      _avg:{
        covered_distance:true
      },
      where:{
        return_station_id:_station_id
      },
    }),
  ])

  return {
    details:data[0],
    total_departures:data[1],
    total_return:data[2],
    avg_departure_distance:data[3]._avg,
    avg_return_distance:data[4]._avg,
  }

}

const getStationList = async (page:string,totalRecords:string)=>{

  const _page = parseInt(page)
  const _totalRecords = parseInt(totalRecords)

  const stations = await db.$transaction([
    db.stationDetails.count(),
    db.stationDetails.findMany({
      take: _totalRecords,
      skip: (_page - 1) * _totalRecords,
      select:{
        name:true,
        station_id:true
      }
    }),
  ]);


  return {
    totalRecords:stations[0],
    stations:stations[1]
  }

}

export { searchStation, getStationDetails, getStationList};
