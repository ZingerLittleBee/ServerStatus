import { LimitInfo, VersionInfo } from "../utils/versionUtil.ts";

export const db = await Deno.openKv();

export async function loadVersionInfo(): Promise<VersionInfo | null> {
    const result = await db.get(["version"])
    const value = result.value
    if (!value || value.lastUpdate < Date.now() - 1000 * 5) return null
    return value as VersionInfo
}

export async function saveVersionInfo(version: VersionInfo) {
    await db.set(["version"], { ...version, lastUpdate: Date.now() })
}

export async function loadLimitInfo(): Promise<LimitInfo | null> {
    const result = await db.get(["limit"])
    const value = result.value
    if (!value || value.lastUpdate < Date.now() - 1000 * 5) return null
    return value as LimitInfo
}

export async function saveLimitInfo(limit: LimitInfo) {
    await db.set(["limit"], { ...limit, lastUpdate: Date.now()})
}
