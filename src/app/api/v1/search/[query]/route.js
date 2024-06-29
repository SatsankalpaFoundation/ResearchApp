import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const response = await axios.post("http://127.0.0.1:7700/multi-search", {
      queries: [
        {
          indexUid: "books",
          q: `${params.query}`,
          showRankingScore: true
        },
        {
          indexUid: "Museum",
          q: `${params.query}`,
          showRankingScore: true
        },
      ],
    });
    return new NextResponse(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
