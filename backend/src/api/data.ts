import { google } from "googleapis";

const API_KEY = process.env.API_KEY || '';
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || '';
const RANGE = process.env.RANGE || '';

const sheets = google.sheets({ version: "v4", auth: API_KEY });

export async function GetData() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });
  const rows = response.data.values;
  const data: any = [];
  rows?.map((row, i) => {
    if (i !== 0) {
      const day = (rows[i][0]).split("/")
      data.push({
        day: `${day[0]}/${day[1]}/2024`,
        age: rows[i][1],
        gender: rows[i][2],
        a: rows[i][3],
        b: rows[i][4],
        c: rows[i][5],
        d: rows[i][6],
        e: rows[i][7],
        f: rows[i][8],
      });
    }
  });
  return data;
}
