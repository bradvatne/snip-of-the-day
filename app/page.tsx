import supabase from "../lib/supabase";
import SnipPreview from "../components/SnipPreview";

export default async function Home() {
  const { data, error } = await supabase.from("snips").select();
  return (
    <div>
      {data &&
        data.map((snip, index) => <SnipPreview key={index} snippet={snip} />)}
    </div>
  );
}
