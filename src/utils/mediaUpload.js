import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default async function uploadMedia(file) {
    if (!file) {
        throw new Error("No file selected");
    }

    const timeStamp = Date.now();
    const fileName = `${timeStamp}_${file.name}`;

    const { error: uploadError } = await supabase.storage
        .from("Images")
        .upload(fileName, file, {
            upsert: false,
            cacheControl: "3600",
        });

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage
        .from("Images")
        .getPublicUrl(fileName);

    if (!data?.publicUrl) {
        throw new Error("Could not generate public image URL");
    }

    return data.publicUrl;
}