import { Box, Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Footer from "./Footer";
import HeaderNew from "./Header";
import Meta from "./Meta";
import { Analytics } from '@vercel/analytics/react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" minWidth={"100%"} transition="0.5s ease-out">

      <HeaderNew />
        <Meta />

        <Flex wrap="wrap" margin="0" minHeight="90vh">
          <Box width="full" as="main" marginY={0}>
            {children}
            <Analytics />

          </Box>

          <Footer />
        </Flex>
      </Box>
  );
};

export default Layout;
