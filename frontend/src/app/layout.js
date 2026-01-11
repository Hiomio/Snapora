import SessionWrapper from "@/components/hoc/SessionWrapper";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { FollowProvider } from "@/context/FollowContext";
import { UsersProvider } from "@/context/UsersContext";
import { LikesFavoritesProvider } from "@/context/LikesFavoritesContext";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import LoadingScreen from "@/components/screens/LoadingScreen";
import NextTopLoader from "nextjs-toploader";
import { DeveloperInfo } from "@/components";

export const metadata = {
  title: "Snapora — Upload, share, and shine—your images, your way.",
  description: "Share your world in pixels! Upload, organize, and showcase your favorite images with ease on Pixora—the simplest way to share memories, art, and moments with friends or the world. Fast, free, and fun!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<LoadingScreen />}>
          <SessionWrapper>
            <AuthProvider>
              <FollowProvider>
                <UsersProvider>
                  <LikesFavoritesProvider>
                    <NextTopLoader
                      color="#8b5cf6"
                      showSpinner={false}
                    />
                    <Toaster position="top-center" />
                    {children}
                    <DeveloperInfo />
                  </LikesFavoritesProvider>
                </UsersProvider>
              </FollowProvider>
            </AuthProvider>
          </SessionWrapper>
        </Suspense>
      </body>
    </html>
  );
}
