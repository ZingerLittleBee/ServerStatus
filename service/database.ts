import { LimitInfo, VersionInfo } from "../utils/versionUtil.ts";

export const db = await Deno.openKv();

export async function loadVersionInfo(): Promise<VersionInfo | null> {
    const result = await db.get(["version"])
    return result.value ? result.value as VersionInfo : null
}

export async function saveVersionInfo(version: VersionInfo) {
    await db.set(["version"], version, {
        expireIn: 1000
    })
}

export async function loadLimitInfo(): Promise<LimitInfo | null> {
    const result = await db.get(["limit"])
    return result.value ? result.value as LimitInfo : null
}

export async function saveLimitInfo(limit: LimitInfo) {
    await db.set(["limit"], limit, {
        expireIn: 1000
    })
}