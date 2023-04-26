import supabase from "../lib/supabase";
import SnipPreview from "../ui/snip-preview";

export const revalidate = 0;

export default async function Home() {
  const { data, error } = await supabase
    .from("snips")
    .select()
    .order("id", { ascending: false });
  return (
    data &&
    data.map((snip: any) => <SnipPreview key={snip.id} snippet={snip} />)
  );
}
