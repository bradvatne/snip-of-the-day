import supabase from "../lib/supabase";
import "server-only";
import SnipPreview from "../components/SnipPreview";

export default async function Home() {
  const { data: snips, error } = await supabase.from("snips").select();
  error ? console.log(error) : console.log(snips);
  return snips?.map((snip, index) => (
    <SnipPreview key={index} snippet={snip} />
  ));
}
