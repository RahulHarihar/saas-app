import ModuleCard from "@/components/ModuleCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllModules } from "@/lib/actions/module.actions";
import { getSubjectColor } from "@/lib/utils";

const page = async ({ searchParams }: SearchParams) => {
	const filters = await searchParams;
	const subject = filters.subject ? filters.subject : "";
	const topic = filters.topic ? filters.topic : "";

	const modules = await getAllModules({ subject, topic });

	console.log(modules);

	return (
		<main>
			<section className='flex justify-between gap-4 max-sm:flex-col'>
				<h1>Module Library</h1>
				<div className='flex gap-4'>
					<SearchInput />
					<SubjectFilter />
				</div>
			</section>
			<section className='companions-grid'>
				{modules.map((module) => (
					<ModuleCard
						key={module.id}
						{...module}
						color={getSubjectColor(module.subject)}
					/>
				))}
			</section>
		</main>
	);
};

export default page;
