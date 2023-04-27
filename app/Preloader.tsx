"use client";

import { useRef } from "react";
import { store } from "../store";
import { fetchInitialSnips } from "../store/snipsSlice";
import { SnipWithComments as Snip } from "../lib/database";

export default function Preloader({ snips }: { snips: Snip[] }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(fetchInitialSnips(snips));
    loaded.current = true;
  }
  return null;
}
