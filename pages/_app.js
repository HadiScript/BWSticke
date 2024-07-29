// css
// import "react-toastify/dist/ReactToastify.css";
// import "~/public/css/bootstrap.min.css";

// import "/public/assets/css/animate.css";
// import "/public/assets/css/bootstrap.min.css";
// import "/public/assets/css/fontawesome.min.css";
// import "/public/assets/css/nice-select.css";
// import "/public/assets/css/slick.css";
// import "/public/assets/css/swiper-bundle.css";
// import "/public/assets/css/magnific-popup.css";
// import "/public/assets/css/meanmenu.css";
// import "/public/assets/css/spacing.css";
// import "/public/assets/css/main.css";
// import "/public/assets/css/antd.css";

import "react-toastify/dist/ReactToastify.css";
import "/public/assets/css/animate.css";
import "/public/assets/css/bootstrap.min.css";
import "/public/assets/css/fontawesome.min.css";
import "/public/assets/css/nice-select.css";
import "/public/assets/css/slick.css";
import "/public/assets/css/swiper-bundle.css";
import "/public/assets/css/magnific-popup.css";
import "/public/assets/css/meanmenu.css";
import "/public/assets/css/spacing.css";
import "/public/assets/css/main.css";

import { SessionProvider } from "next-auth/react";

// modules
import { useEffect } from "react";
import dynamic from "next/dynamic";

import { wrapper } from "~/redux/store";

import { appWithI18Next } from "ni18n";
import { ni18nConfig } from "../ni18n.config";

const NextNProgress = dynamic(() => import("nextjs-progressbar"), {
  ssr: false,
});

const Flip = dynamic(() => import("react-toastify").then((module) => module.Flip));
const ToastContainer = dynamic(() => import("react-toastify").then((module) => module.ToastContainer));

// Use the new font
import { Jost } from "@next/font/google";
import CheckAuth from "~/components/Auth/authCheck";
const jost = Jost({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-body",
});

const CookieContest = dynamic(() => import("~/components/cookieContest"));

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("../public/js/jquery.min.js");
    import("../public/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <SessionProvider session={pageProps.session} refetchInterval={10 * 60}>
      <style jsx global>{`
        html,
        body {
          font-family: ${jost.style.fontFamily};
        }
      `}</style>
      <NextNProgress color="red" options={{ showSpinner: false }} />

      {/* cookies */}
      <CookieContest />

      <CheckAuth auth={Component.requireAuth} authAdmin={Component.requireAuthAdmin}>
        <Component {...pageProps} />
      </CheckAuth>

      {/* toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover
        theme="light"
      />
    </SessionProvider>
  );
}

export default wrapper.withRedux(appWithI18Next(MyApp, ni18nConfig));
