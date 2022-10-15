import http from "../../utils/http";
import dotenv from "dotenv";

dotenv.config()

export enum Status {
  OK = "OK",
  ERROR = "ERROR"
}

export interface SetClipboardProps {
  content: string
  format: string
  expiration?: string
}

export interface ISetClipboardRes {
  status: Status
  url: string
}

export const UBUNTU_PASTE_USERNAME = process.env.UBUNTU_PASTE_USERNAME
export const UBUNTU_PASTE_COOKIE = "sessionid=" + process.env.UBUNTU_PASTE_SESSIONID
export const UBUNTU_PASTE_HOST = 'https://paste.ubuntu.com'

export const setClipboard = async (props: SetClipboardProps): Promise<ISetClipboardRes> => {

  const formData = {
    'poster': UBUNTU_PASTE_USERNAME,
    'syntax': props.format || "text",
    "expiration": props.expiration || '',
    "content": props.content,
  }

  /**
   * 1. 不需要使用 `form-data` 构造body，直接指定 `Content-Type` 然后传 json 即可
   * 2. 不需要加 `Content-Length`，这个 axios 会自己基于 `form-data` 计算 （自己计算的话可以用`qs`）
   * 3. 不能使用 `maxRedirects`，会导致返回错误 （正常是需要 302 的）
   * 4. 不需要使用 `withCredentials`，直接在headers里指定 Cookie 项即可
   * 5. 网页中的response会把新的地址以uri存在headers.Location，但在axios中是在 response.request.path
   * @type {AxiosResponse<any>}
   */
  const response = await http.post(
    UBUNTU_PASTE_HOST,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": UBUNTU_PASTE_COOKIE,
      },
    }
  )
  let url = response.request.path as unknown as string
  if (url.startsWith('/'))
    url = UBUNTU_PASTE_HOST + url
  const result = {url, status: Status.OK}
  console.log(result)
  return result
}