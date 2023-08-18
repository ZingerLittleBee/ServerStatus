import {getVersionFromGithub} from "../utils/versionUtil.ts";

export default async function Home() {

  const { preVersion, prePageUrl, stablePageUrl, stableVersion } = await getVersionFromGithub()

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <div className="flex flex-col flex-start item-center">
            <p class="my-4">
                Stable version: {stableVersion}
            </p>
            <p class="my-4">
                Url: {stablePageUrl}
            </p>
        </div>
          <div className="flex flex-col flex-start item-center">
              <p className="my-4">
                  Pre version: {preVersion}
              </p>
              <p className="my-4">
                  Url: {prePageUrl}
              </p>
          </div>
      </div>
    </div>
  );
}

