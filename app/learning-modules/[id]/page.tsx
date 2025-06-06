import { getModule } from "@/lib/actions/module.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import ModuleComponent from "@/components/ModuleComponent";

interface ModuleSessionPageProps {
	params: Promise<{ id: string }>;
}

const LearningSession = async ({ params }: ModuleSessionPageProps) => {
	const { id } = await params;
	const module = await getModule(id);
	const user = await currentUser();

	if (!user) redirect("/sign-in");

	if (!module) redirect("/learning-modules");

	// Destructure only if module exists
	const { name, subject, title, topic, duration } = module;

	return (
		<main className='container mx-auto px-4 py-8'>
			<article className='flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md gap-4'>
				<div className='flex items-center gap-4'>
					{/* Icon Container */}
					<div
						className='size-16 flex items-center justify-center rounded-lg md:size-20'
						style={{ backgroundColor: getSubjectColor(subject) }}>
						<Image
							src={`/icons/${subject}.svg`}
							alt={`${subject} icon`}
							width={40}
							height={40}
							className='object-contain'
						/>
					</div>
					{/* Module Info */}
					<div className='flex flex-col gap-2'>
						<div className='flex flex-col sm:flex-row sm:items-center gap-2'>
							<h1 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white'>
								{name}
							</h1>
							<span
								className='subject-badge inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-black'
								style={{ backgroundColor: getSubjectColor(subject) }}>
								{subject}
							</span>
						</div>
						<p className='text-lg text-gray-600 dark:text-gray-300'>{topic}</p>
					</div>
				</div>
				{/* Duration */}
				<div className='flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0'>
					<span className='text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200'>
						{duration} min
					</span>
				</div>
			</article>
			<ModuleComponent
				{...module}
				moduleId={id}
				userName={user.firstName!}
				userImage={user.imageUrl!}
			/>
		</main>
	);
};

export default LearningSession;
