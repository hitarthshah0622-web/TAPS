import type { NextConfig } from 'next';
const nextConfig:NextConfig={experimental:{workerThreads:true,cpus:1,webpackBuildWorker:false},devIndicators:false,turbopack:process.env.TABLETAP_LOCAL_PREVIEW==='1'?{resolveAlias:{'cloudflare:workers':'./lib/cloudflare-local.ts'}}:{},webpack(config){config.externals=[...(config.externals||[]),({request}: {request?:string},callback:(error?:Error|null,result?:string)=>void)=>request==='cloudflare:workers'?callback(null,'commonjs cloudflare:workers'):callback()];return config;}};
export default nextConfig;
