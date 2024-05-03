import { easeInOut } from "framer-motion";

export const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easeInOut,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easeInOut,
    },
  },
};
