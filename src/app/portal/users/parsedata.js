'use server'

export default async function parsedata(data) {
    const parsedData = JSON.parse(data);
    return parsedData;
}