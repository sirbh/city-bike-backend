import db from '../../utils/database'

type IQuery = {
    page:string,
    totalRecords:string,
    sortBy?:string,
    order?:'asc'|'desc'
}

const SORTABLE_COLUMNS = ['departure_station_name','return_station_name','covered_distance','duration']
const ORDER = ['asc','desc']

const getJourney = async({page,order,sortBy,totalRecords}:IQuery)=>{
    
    const _page = parseInt(page)
    const _totalRecords = parseInt(totalRecords)

    const _orderBy:{
        [key:string]:string
    } = {}

    if(order && sortBy){
       if(SORTABLE_COLUMNS.includes(sortBy) && ORDER.includes(order))
       {
        _orderBy[sortBy]=order
       }
       else {
        throw {
            message:'INVALID REQUEST'
        }
       }
    }
    else if(order||sortBy){
        throw {
            message:'INVALID REQUEST'
        }
    }
    

    const journey = await db.journey.findMany(
     {
        take:_totalRecords,
        skip:(_page-1)*_totalRecords,
        orderBy:_orderBy
     }
    )
    return journey
}

export {getJourney,IQuery}