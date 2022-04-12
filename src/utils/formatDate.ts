//const exp = "2022-03-29 10:07:07";

function formatDate(values: string) {
    const values_arr = values?.split(" ");
    const data_arr = values_arr[0]?.split("-");
    const date = `${data_arr[2]}/${data_arr[1]}/${data_arr[0]}`
    return date;
}
export default formatDate;