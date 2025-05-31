"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";

export const createModule = async (formData: CreateModule) => {
	const { userId: author } = await auth();
	const supabase = createSupabaseClient();

	const { data, error } = await supabase
		.from("modules")
		.insert({ ...formData, author })
		.select();

	if (error || !data)
		throw new Error(error?.message || "Failed to create a module");

	return data[0];
};

export const getAllModules = async ({
	limit = 10,
	page = 1,
	subject,
	topic,
}: GetAllModules) => {
	const supabase = createSupabaseClient();

	let query = supabase.from("modules").select();

	if (subject && topic) {
		query = query
			.ilike("subject", `%${subject}%`)
			.or(`topic.ilike.%${topic}%, name.ilike.%${topic}`);
	} else if (subject) {
		query = query.ilike("subject", `%${subject}%`);
	} else if (topic) {
		query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}`);
	}

	query = query.range((page - 1) * limit, page * limit - 1);

	const { data: modules, error } = await query;

	if (error) throw new Error(error.message);

	return modules;
};

export const getModule = async (id: string) => {
	const supabase = createSupabaseClient();

	const { data, error } = await supabase
		.from("modules")
		.select()
		.eq("id", id)
		.single();

	if (error) {
		console.error(error.message);
		return null;
	}

	return [0];
};

export const addBookmark = async (companionId: string, path: string) => {
	const { userId } = await auth();
	if (!userId) return;
	const supabase = createSupabaseClient();
	const { data, error } = await supabase.from("bookmarks").insert({
		companion_id: companionId,
		user_id: userId,
	});
	if (error) {
		throw new Error(error.message);
	}
	// Revalidate the path to force a re-render of the page

	revalidatePath(path);
	return data;
};

export const removeBookmark = async (companionId: string, path: string) => {
	const { userId } = await auth();
	if (!userId) return;
	const supabase = createSupabaseClient();
	const { data, error } = await supabase
		.from("bookmarks")
		.delete()
		.eq("companion_id", companionId)
		.eq("user_id", userId);
	if (error) {
		throw new Error(error.message);
	}
	revalidatePath(path);
	return data;
};
