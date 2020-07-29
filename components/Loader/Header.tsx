import ContentLoader, { IContentLoaderProps } from "react-content-loader";

const HeaderLoader = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={1}
    width={93}
    height={32}
    viewBox="0 0 93 32"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="93" height="32" />
  </ContentLoader>
);

export default HeaderLoader;
