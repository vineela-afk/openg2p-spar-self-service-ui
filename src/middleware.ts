import {NextRequest, NextResponse} from 'next/server';
import createMiddleware from "next-intl/middleware";
import { getConfig, getSupportedLocales } from '@/utils/config';

const nextIntlMiddleware = createMiddleware({
  locales: getSupportedLocales(),
  defaultLocale: "en",
});

export function middleware(request: NextRequest) {
  if(request.nextUrl.pathname.endsWith("/config")){
    return NextResponse.json(getConfig());
  } else if (getSupportedLocales().some((lang: string) => request.nextUrl.pathname.startsWith(`/${lang}`))){
    return nextIntlMiddleware(request);
  }
}
