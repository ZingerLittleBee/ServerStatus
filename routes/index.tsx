import { getLimit, getVersion } from "../utils/versionUtil.ts";

export default async function Home() {

    let versionInfo = await getVersion()
    if (!versionInfo) {
        versionInfo = {
            stableVersion: 'Unknown',
            stablePageUrl: '',
            preVersion: 'Unknown',
            prePageUrl: ''
        }
    }
    const { stableVersion, stablePageUrl, preVersion, prePageUrl } = versionInfo

    const limit = await getLimit()

  return (
    <div className="px-4 py-8 mx-auto h-full min-h-screen flex flex-col" style="background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);">
      <div className="flex-1 max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.png"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">ServerBee Status</h1>
        <div className="my-6 grid md:grid-cols-2 sm:grid-cols-1 gap-4">
              {
                  CardView({title: "Stable", version: stableVersion, url: stablePageUrl})
              }
              {
                  CardView({title: "Pre-Release", version: preVersion ?? 'No pre-release', url: prePageUrl})
              }
              <div className="col-span-full">
                {
                    SpeedCardView(limit)
                }
              </div>
        </div>
      </div>
        <div className="text-center mt-8 text-gray-700">
            <p>&copy; {new Date().getFullYear()} ServerBee. All rights reserved.</p>
            <a href="https://github.com/ZingerLittleBee/ServerStatus" className="hover:underline" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
    </div>
  );
}

const CardView = ({title, version, url}) => {
    return (
        <div className="md:col-span-1 sm:col-span-2 max-w-72 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{version}</p>
            <a href={url} target="_blank" className={`inline-flex items-center hover:underline select-none ${url ? 'text-blue-600' : 'cursor-not-allowed text-gray-500'}`}>
                See release page
                <svg className="w-3 h-3 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                </svg>
            </a>
    </div>
    )
}

const SpeedCardView = ({ limit, remaining,  used, reset}) => {
    return (
        <div className="p-4 bg-white rounded-lg dark:bg-gray-800">
            <h2 className="flex justify-center mb-3 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Speed Limit</h2>
            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 text-gray-900 sm:grid-cols-2 xl:grid-cols-2 dark:text-white sm:p-8">
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{limit}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Limit</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{remaining}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Remaining</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{used}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Used</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-md font-extrabold">{new Date(reset * 1000).toISOString()}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Reset</dd>
                </div>
            </dl>
        </div>
    )
}
