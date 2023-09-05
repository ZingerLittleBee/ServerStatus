import {Handlers} from "https://deno.land/x/fresh@1.4.2/src/server/types.ts";
import {getVersion} from "../../utils/versionUtil.ts";

export const handler: Handlers<string | null> = {
    async GET(_req, ctx) {
        const info  = await getVersion()
        return new Response(info?.preVersion ?? info?.stableVersion);
    },
};
