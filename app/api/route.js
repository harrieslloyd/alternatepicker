export const dynamic = 'force-static'
import { promises as fs } from 'fs';
import * as csvParser from "csv-parser"
import Papa from 'papaparse'

 
export async function GET() {
    var list = [];

    var items = []
    var ref = {}

    const file = await fs.readFile(process.cwd() + '/app/rankings.csv', 'utf8');
    list = await Papa.parse(file, {
        delimiter: ",",
        newline: "",
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            return (results.data)
        },
        error: function (error) {
            // Handle any errors      
            console.error("Parsing error:", error.message);
        }
    });

 
  return Response.json({ list })
}