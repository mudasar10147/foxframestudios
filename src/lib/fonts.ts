import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Orbitron } from "next/font/google";

export const geistSans = GeistSans;

export const geistMono = GeistMono;

export const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  orbitron.variable,
].join(" ");
