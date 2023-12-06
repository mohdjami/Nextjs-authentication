import { NextRequest, NextResponse } from "next/server";
import { handleAction } from "@/lib/apiHandler";
import { useRouter } from "next/router";

// export default async function handler(req: NextRequest, res: NextResponse) {
//   const router = useRouter();
//   //   req.method
//   const { action } = router.query;
//   console.log(action);
//   try {
//     await handleAction(action as string, req, res);
//   } catch (error) {
//     console.error("Error handling action:", error);
//     return NextResponse.json(
//       { message: "something went wrong" },
//       { status: 500 }
//     );
// //   }
// // }
// export default async function POST(req: NextRequest, res: NextResponse) {
//   console.log(action);
//   try {
//     return NextResponse.json({ message: "success" }, { status: 200 });
//   } catch (error) {
//     console.error("Error handling action:", error);
//     return NextResponse.json(
//       { message: "something went wrong" },
//       { status: 500 }
//     );
//   }
// }
