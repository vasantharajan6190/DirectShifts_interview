import { Octokit } from "octokit";


export const octokit = new Octokit({ auth: `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` });

export const fetchData = async(method,setterMethod,params) => {
    await octokit.request(`GET ${params.url}`, {
        owner: "facebook",
        repo: "react",
        ...(params?.state && {state: params.state}),
        ...(params?.sort && {sort: params.sort}),
        ...(params?.per_page && {per_page: params.per_page}),
        ...(params?.page && {page: params.page}),
        ...(params?.labels && {labels: params.labels}),
        ...(params?.pulls && {pulls: params.pulls}),
        ...(params?.direction && {direction: params.direction}),
      }).then((res)=>{
        setterMethod(res)
        return res
      }).catch((err)=>{
        return false
      })
}