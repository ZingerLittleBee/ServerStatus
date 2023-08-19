interface ReleasesResponse {
    tag_name: string
    prerelease: boolean
    draft: boolean
    html_url: string
}

interface VersionInfo {
    stableVersion?: string
    stablePageUrl?: string
    preVersion?: string
    prePageUrl?: string
}

export const getVersionFromGithub = async (): Promise<VersionInfo | null> => {
    const resp = await fetch("https://api.github.com/repos/ZingerLittleBee/server_bee-backend/releases",
        {
            headers: {
                'Authorization': `Bearer ${Deno.env.get("GITHUB_TOKEN")}`
            }
        }
        )
    const release = (await resp.json()) as ReleasesResponse[]
    const preRelease = release.find((r) => !r.draft && r.prerelease)
    const stableRelease = release.find((r) => !r.draft && !r.prerelease)
    return {
            stableVersion: stableRelease?.tag_name,
            stablePageUrl: stableRelease?.html_url,
            preVersion: preRelease?.tag_name,
            prePageUrl: preRelease?.html_url,
    }
}

interface LimitInfo {
    limit: number
    remaining: number
    used: number
    reset: number
}

export const getLimit = async (): Promise<LimitInfo> => {
    const resp = await fetch("https://api.github.com/repos/ZingerLittleBee/server_bee-backend",
        {
            headers: {
                'Authorization': `Bearer ${Deno.env.get("GITHUB_TOKEN")}`
            }
        }
    )
    return {
        limit: parseInt(resp.headers.get("X-RateLimit-Limit") ?? "0"),
        remaining: parseInt(resp.headers.get("X-RateLimit-Remaining") ?? "0"),
        used: parseInt(resp.headers.get("X-RateLimit-Used") ?? "0"),
        reset: parseInt(resp.headers.get("X-RateLimit-Reset") ?? "0"),
    }
}
