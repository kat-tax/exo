import {Suspense, lazy} from 'react';

export default function Layout(props: React.PropsWithChildren) {
  const ThemeSwitcher = lazy(() => import('utils/theme')
    .then((module) => ({default: module.ThemeSwitcher})));
  return (
    <>
      <Suspense>
        <ThemeSwitcher/>
      </Suspense>
      {props.children}
    </>
  )
}
