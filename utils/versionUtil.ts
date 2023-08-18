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
    const resp = await fetch("https://api.github.com/repos/ZingerLittleBee/server_bee-backend/releases")
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
