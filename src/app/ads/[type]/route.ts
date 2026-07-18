import { NextResponse } from "next/server";
import { AD_KEYS } from "@/ads-config";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const ad = AD_KEYS[type];

  if (!ad) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0">
<script type="text/javascript">
atOptions = {
  'key' : '${ad.key}',
  'format' : 'iframe',
  'height' : ${ad.height},
  'width' : ${ad.width},
  'params' : {}
};
</script>
<script src="https://www.highperformanceformat.com/${ad.key}/invoke.js"></script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
