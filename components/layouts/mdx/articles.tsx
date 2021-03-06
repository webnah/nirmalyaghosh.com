import React from "react";
import {
  Box,
  Grid,
  Stack,
  Heading,
  Text,
  useColorMode,
  Icon,
} from "@chakra-ui/core";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import siteConfig from "config/site";
import { NextSeo } from "next-seo";

const SocialLinks = dynamic(
  import(/* webpackChunkName: "SocialLinks" */ "components/social-links")
);
const Navbar = dynamic(
  import(/* webpackChunkName: "Navbar" */ "components/navbar")
);
const Footer = dynamic(
  import(/* webpackChunkName: "Footer" */ "components/footer")
);
const SocialShare = dynamic(
  import(/* webpackChunkName: "SocialShare" */ "components/social-share"),
  {
    ssr: false,
  }
);

dayjs.extend(localizedFormat);

const ArticlesMdxLayout = ({ frontMatter, children }) => {
  const { colorMode } = useColorMode();
  const sectionBgColor = { light: "white", dark: "black" };
  const sectionColor = { light: "black", dark: "gray.100" };

  const metaNode = (date: string, readingTime: string) => {
    return (
      <Stack spacing={4} isInline alignItems="center">
        <Box>
          <Text fontSize="xs">{dayjs(date).format("LL")}</Text>
        </Box>
        <Icon name="minus" size="12px" />
        <Box>
          <Text fontSize="xs">{readingTime}</Text>
        </Box>
      </Stack>
    );
  };

  const titleNode = (title: string) => {
    return (
      <Heading as="h1" size="xl">
        {title}
      </Heading>
    );
  };

  const coverImageNode = () => {
    if (!frontMatter.coverImage) {
      return (
        <Box
          bgImage={`url(/images/common/cover.jpg)`}
          bgSize="cover"
          bgPos="center"
          h={64}
          bg="gray.100"
        />
      );
    }

    return (
      <Box
        bgImage={`url(${frontMatter.coverImage})`}
        bgSize="cover"
        bgPos="center"
        h={64}
        bg="gray.100"
      />
    );
  };

  return (
    <>
      <NextSeo
        title={`${frontMatter.title} | ${siteConfig.details.title}`}
        description={frontMatter.description}
        openGraph={{
          url: `${siteConfig.details.url}/${frontMatter.__resourcePath.replace(
            ".mdx",
            "/"
          )}`,
          title: frontMatter.title,
          description: frontMatter.description,
          images: [
            {
              url: frontMatter.coverImage
                ? frontMatter.coverImage
                : "/images/common/cover.jpg",
              width: 800,
              height: 600,
              alt: frontMatter.title,
            },
          ],
          site_name: siteConfig.details.title,
          type: "article",
          locale: "en_IE",
        }}
      />
      <SocialLinks />
      <Navbar />
      <Box bg={sectionBgColor[colorMode]} color={sectionColor[colorMode]}>
        {coverImageNode()}
        <Box maxW="3xl" mx="auto" px={4} py={8}>
          <Grid templateColumns="1fr">
            <Box maxW="100%" overflowX="hidden">
              <Stack spacing={8}>
                {metaNode(frontMatter.date, frontMatter.readingTime.text)}
                {titleNode(frontMatter.title)}
                <Box>
                  <SocialShare title={frontMatter.title} />
                </Box>
                <Box className="article">{children}</Box>
                <Box>
                  <SocialShare title={frontMatter.title} />
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ArticlesMdxLayout;
