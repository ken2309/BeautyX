//2021-12-24 08:43:39
import dayjs from "dayjs";

export const formatDate = (dateParams: any) => {
    const dateArr = dateParams?.split(' ');
    const date = dateArr[0]?.split('-')?.reverse().join('/')
    return date
}
export const checkTimeExpired = (time_expired: any) => {
    let dateExpired = false
    if (!time_expired || time_expired?.slice(0, 5) < 0) return dateExpired = false
    const now = dayjs().format('YYYY/MM/DD')
    const dateExNum = `${time_expired?.slice(0, 4)}${time_expired?.slice(5, 7)}${time_expired?.slice(8, 10)}`
    const nowNum = `${now.slice(0, 4)}${now.slice(5, 7)}${now.slice(8, 10)}`
    if (dateExNum < nowNum) {
        dateExpired = true
    }
    return dateExpired
}

export const formatDistance = (distance?: number) => {
    let dis: string = '';
    if (distance) {
        dis = distance < 1000 ? `${Math.round(distance)} m` : `${Math.round(distance / 1000)} km`;
    }
    return dis;
}