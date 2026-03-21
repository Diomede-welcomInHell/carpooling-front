import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase() ?? "";

    const filePath = path.join(process.cwd(), "public", "car-brands.csv");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Parser avec séparateur ";" et extraire seulement la 2ème colonne (nom)
    const brands = fileContent
        .split("\n")
        .map((line) => {
            const [id, name] = line.split(";");
            return { id: id?.trim(), name: name?.trim() };
        })
        .filter((b) => b.name);

    const items =
        query.length > 0
            ? brands.filter((brand) => brand.name.toLowerCase().startsWith(query))
            : brands.slice(0, 20);

    return NextResponse.json({ items});
}