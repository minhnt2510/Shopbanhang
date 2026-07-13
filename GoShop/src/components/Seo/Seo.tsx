import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
}

const SITE_NAME = "GoShop";
const SITE_URL = "https://goshopminhntd.vercel.app";
const DEFAULT_DESC =
  "GoShop - Mua sắm trực tuyến với nhiều ưu đãi hấp dẫn. Điện thoại, thời trang, đồ điện tử và nhiều sản phẩm khác.";
const DEFAULT_IMAGE = "/vite.svg";

export default function Seo({
  title,
  description = DEFAULT_DESC,
  keywords,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = "website",
}: SeoProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
}
