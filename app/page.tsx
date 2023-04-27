import SnipPreview from "../ui/snip-preview";
import { store } from "../store";
import { SnipWithComments as Snip } from "@/lib/database";
import { RootState } from "../store";

export const revalidate = 0;

export default async function Home() {
  const snipState = store.getState().snips;
  const snips = snipState.initialSnips;
  return snips.map((snip: Snip) => (
    <SnipPreview key={snip.id} snippet={snip} comments={snip.comments} />
  ));
}
