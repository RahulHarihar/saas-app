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

	const { data, error } = await supabase.from("modules").select().eq("id", id);

	if (error) {
		console.error(error.message);
		return null;
	}

	if (!data) {
		return null;
	}

	return data[0];
};

export const addToSessionHistory = async (moduleId: string) => {
	const { userId } = await auth();
	const supabase = createSupabaseClient();
	const { data, error } = await supabase
		.from("session_history")
		.insert({ module_id: moduleId, user_id: userId });

	if (error) throw new Error(error.message);

	return data;
};

export const getRecentSessions = async (limit: 10) => {
	const supabase = createSupabaseClient();
	const { data, error } = await supabase
		.from("session_history")
		.select(`modules:module_id(*)`)
		.order("created_at", { ascending: false })
		.limit(limit);

	if (error) throw new Error(error.message);

	return data.map(({ modules }) => modules);
};

export const getUserSessions = async (userId: string, limit: 10) => {
	const supabase = createSupabaseClient();
	const { data, error } = await supabase
		.from("session_history")
		.select(`modules:module_id(*)`)
		.eq("user_id", userId)
		.order("created_at", { ascending: false })
		.limit(limit);

	if (error) throw new Error(error.message);

	return data.map(({ modules }) => modules);
};

export const getUserModules = async (userId: string) => {
	const supabase = createSupabaseClient();
	const { data, error } = await supabase
		.from("modules")
		.select()
		.eq("author", userId);

	if (error) throw new Error(error.message);

	return data;
};

export const newModulePermissions = async () => {
	const { userId, has } = await auth();
	const supabase = createSupabaseClient();

	let limit = 0;

	if (has({ plan: "pro" })) {
		return true;
	} else if (has({ feature: "lite" })) {
		limit = 3;
	} else if (has({ feature: "plus" })) {
		limit = 10;
	}

	const { data, error } = await supabase
		.from("modules")
		.select("id", { count: "exact" })
		.eq("author", userId);

	if (error) throw new Error(error.message);

	const moduleCount = data?.length;

	if (moduleCount >= limit) {
		return false;
	} else {
		return true;
	}
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
