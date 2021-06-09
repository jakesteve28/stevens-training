//
// 2021 Jacob Stevens Util File


/**
 * Taken from website 
 * https://www.geodatasource.com/developers/javascript
 * Note:  South latitudes are negative, east longitudes are positive   
 * @param latitude1 
 * @param longitude1 
 * @param latitude2 
 * @param longitude2 
 * @returns 
 */
export function findDistance(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number {
    if((latitude1 == latitude2) && (longitude1 == longitude2)) {
        return 0;
    }
    const radianLat1 = Math.PI * latitude1 / 180; 
    const radianLat2 = Math.PI * latitude2 / 180; 
    const theta = longitude1 - longitude2; 
    const radiantheta = Math.PI * theta / 180; 
    let distance = Math.sin(radianLat1) * Math.sin(radianLat2) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.cos(radiantheta);
    if(distance > 1) distance = 1;
    distance = Math.acos(distance); 
    distance = distance * 180/Math.PI; 
    distance = distance * 60 * 1.1515;
    return distance;
}

export const isLatitude = (num: number) => isFinite(num) && Math.abs(num) <= 90;
export const isLongitude = (num: number) => isFinite(num) && Math.abs(num) <= 180;